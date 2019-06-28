<?php
    abstract class Content {
        abstract function getHTML() : string;
    }
    class ImageContent extends Content {
        private $imageUrl;
        function __construct($imageurl) {
            $this->imageUrl = $imageurl;
        }

        function getHTML(): string
        {
            return "<div class='article_image' style=\"background-image: url('$this->imageUrl')\"></div>";
        }
    }
    class TextContent extends Content {
        private $text;
        function __construct($text) {
            $this->text = $text;
        }

        function getHTML(): string {
            return "<div class='article_text'>$this->text</div>";
        }
    }
    class NullContent extends Content {

        function getHTML(): string
        {
            return "";
        }
    }
    class ContentFactory {
        function getContent($type, $value) : Content {
            if($type == 0)
                return new TextContent($value);
            else if($type == 1)
                return new ImageContent($value);
            else
                return new NullContent();
        }
    }
    class ArticleInside {
        private $titolo, $id;
        private $contents = array();

        public function __construct($id) {
            global $connection;
            $results = $connection->query("SELECT articles.titolo as titolo, resources.resourceType as tipo, resources.value as valore, part_number as ordine from articles, resources where articles.id like resources.idA order by part_number ASC");
            $factory = new ContentFactory();
            $this->id = $id;
            while($row = $results->fetch_assoc()) {
                $this->titolo = $row['titolo'];
                $tipo = $row['tipo'];
                $valore = $row['valore'];
                $ordine = "o_".$row['ordine'];
                $content = $factory->getContent($tipo, $valore);
                $this->contents[$ordine] = $content;
            }
        }

        public function getHTML() : string {
            $html = "<div class='news_article_inside'>";
            $html .= "<div class='title'>$this->titolo</div>";
            foreach($this->contents as $key => $value) {
                $html .= $value->getHTML();
            }
            $html .= "</div>";
            return $html;
        }
    }