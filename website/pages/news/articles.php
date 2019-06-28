<?php
    require("connection.php");

    class Article {
        private  $id,$titolo, $descrizione;

        function __construct($id, $titolo, $desc) {
            $this->id = $id;
            $this->titolo = $titolo;
            $this->descrizione = $desc;
        }

        public function getID() : string {
            return $this->id;
        }
        public function getTitle() : string {
            return $this->titolo;
        }
        public function getDescrizione() : string
        {
            return $this->descrizione;
        }

        public function getHTML() : string {
            return "<a class=\"news_article\" href=\"?id=".$this->getID()."\">".
                "<p class=\"article_title\">".$this->getTitle()."</p>".
                "<span class='article_description'>".$this->getDescrizione()."</span>".
                "</a>";
        }
    }
    class Articles {
        private $articles = array();

        public function __construct() {
            global $connection;
            $results = $connection->query("SELECT id, titolo, descrizione FROM articles order by datacreazione DESC");
            while($row = $results->fetch_assoc()) {
                $article = new Article($row['id'], $row['titolo'], $row['descrizione']);
                $this->articles[$row['id']] = $article;
            }
        }

        public function getHTML() : string {
            $html = "<div class=\"news_articles\">";
            foreach($this->articles as $key => $value) {
                $html .= $value->getHTML();
            }
            $html .= "</div>";
            return $html;
        }
    }

    echo "<article class='ContentBlock articles'><div class='data'>";
    echo (new Articles())->getHTML();
    echo "</div></article>";
