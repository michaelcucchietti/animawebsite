<?php
    require("connection.php");

    abstract class Content {
        private $classes = array();
        private $id, $pn, $device;
        protected function getClassString() : string {
            $classString = "";
            $length = count($this->classes);
            for($i = 0; $i < $length; $i++) {
                $classString .= $this->classes[$i];
                if($i < $length - 1)
                    $classString .= " ";
            }
            return $classString;
        }
        protected function getDeviceClass() : string {
            if($this->device == 1)
                return " displayNoneSmartphone";
            else if($this->device == 2)
                return " displayNoneDesktop";

            return "";
        }
        private function addClass($className) : void {
            $this->classes[count($this->classes)] = $className;
        }

        function __construct($id, $part_number, $device) {
            $this->id = $id;
            $this->pn = $part_number;
            $this->device = $device;
        }

        protected function readClasses() {
            global $connection;

            $classes = $connection->query("SELECT classname from resourceclasses where idA like '".$this->id."' and part_number = ".$this->pn);
            while($row = $classes->fetch_assoc()) {
                $this->addClass($row['classname']);
            }
        }

        abstract function getHTML() : string;
    }
    class ImageContent extends Content {
        function __construct($idA, $pn, $device) {
            parent::__construct($idA, $pn, $device);
            $this->readClasses();
        }

        function getHTML(): string
        {
            return "<div class='article_image".$this->getDeviceClass()."'>".
                "<div class='".$this->getClassString()."'></div>".
                "</div>";
        }
    }
    class TextContent extends Content {
        private $text;
        function __construct($idA, $pn, $text, $device) {
            parent::__construct($idA, $pn, $device);
            $this->readClasses();
            $this->text = $text;
        }

        function getHTML(): string {
            return "<div class='".$this->getClassString().$this->getDeviceClass()."'>$this->text</div>";
        }
    }
    class H1Content extends Content {
        private $text;
        function __construct($idA, $pn, $text, $device) {
            parent::__construct($idA, $pn, $device);
            $this->readClasses();
            $this->text = $text;
        }

        function getHTML(): string {
            return "<h1 class='".$this->getClassString()."'>$this->text</h1>";
        }
    }
    class H2Content extends Content {
        private $text;
        function __construct($idA, $pn, $text, $device) {
            parent::__construct($idA, $pn, $device);
            $this->readClasses();
            $this->text = $text;
        }

        function getHTML(): string {
            return "<h2 class='".$this->getClassString()."'>$this->text</h2>";
        }
    }
    class H3Content extends Content {
        private $text;
        function __construct($idA, $pn, $text, $device) {
            parent::__construct($idA, $pn, $device);
            $this->readClasses();
            $this->text = $text;
        }

        function getHTML(): string {
            return "<h3 class='".$this->getClassString()."'>$this->text</h3>";
        }
    }
    class NullContent extends Content {

        function getHTML(): string
        {
            return "";
        }
    }
    class ContentFactory {
        private $idA = null;
        function __construct($idArticle) {
            $this->idA = $idArticle;
        }

        function getContent($pn, $type, $value, $device) : Content {
            if($type == 0)
                return new TextContent($this->idA, $pn, $value, $device);
            else if($type == 1)
                return new H1Content($this->idA, $pn, $value, $device);
            else if($type == 2)
                return new H2Content($this->idA, $pn, $value, $device);
            else if($type == 3)
                return new H3Content($this->idA, $pn, $value, $device);
            else if($type == 4)
                return new ImageContent($this->idA, $pn, $device);
            else
                return new NullContent(null, 0, $device);
        }
    }
    class ArticleInside {
        private $titolo, $id;
        private $contents = array();

        public function __construct($id) {
            global $connection;
            $connection->connect();
            $results = $connection->query("SELECT articles.titolo as titolo, ".
                "resources.resourceType as tipo, ".
                "resources.value as valore, ".
                "resources.idA, ".
                "part_number as ordine, ".
                "device ".
                "from articles, resources ".
                "where articles.id like resources.idA ".
                "order by part_number ASC");
            $factory = new ContentFactory($id);
            $this->id = $id;
            while($row = $results->fetch_assoc()) {
                $this->titolo = $row['titolo'];
                $tipo = $row['tipo'];
                $valore = $row['valore'];
                $ordine = "o_".$row['ordine']."_".$row['device'];
                $device = $row['device'];
                $content = $factory->getContent($row['ordine'], $tipo, $valore, $device);
                $this->contents[$ordine] = $content;
            }
            $connection->close();
        }

        public function getHTML() : string {
            $html = "<div class='news_article_inside'>";
            $html .= "<h1 class='title'>$this->titolo</h1>";
            foreach($this->contents as $key => $value) {
                $html .= $value->getHTML();
            }
            $html .= "</div>";
            return $html;
        }
    }

    class HiddenItemToLoad {
        private $value;
        function __construct($url) {
            $this->value = $url;
        }

        function getHTML() : string  {
            return "<div class='displayNone' animasource=\"".$this->value."\"></div>";
        }
    }
    class PreloaderCompiler {
        private $toload = array();
        function __construct($idA) {
            global $connection;
            $connection->connect();
            $result = $connection->query("SELECT resourcepreloader.value as relativeURL from resourcepreloader, articles where articles.id like idA and idA like '".$idA."'");

            while($row = $result->fetch_assoc()) {
                $this->toload[count($this->toload)] = new HiddenItemToLoad($row['relativeURL']);
            }
            $connection->close();
        }

        function getHTML() : string {
            $html = "";
            foreach($this->toload as $item) {
                $html .= $item->getHTML();
            }
            return $html;
        }
    }

    $ida = $_GET['id'];
    $article = new ArticleInside($ida);
    $preloader = new PreloaderCompiler($ida);

    echo "<article class='ContentBlock newsarticle'><div class='data'>";
    echo $preloader->getHTML();
    echo $article->getHTML();
    echo "</div></article>";