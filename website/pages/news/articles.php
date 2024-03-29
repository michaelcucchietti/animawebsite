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
            return "<div class=\"news_article\" onclick='AnimaNews.open_archive_item(this)'>".
                "<div class='content'>".
                "<p class=\"article_title\">".$this->getTitle()."</p>".
                "<span class='article_description'>".$this->getDescrizione()."</span>".
                "</div><div class='actions'>".
                "<button class='goArticle' anima-article-id=\"".$this->getID()."\" onclick='AnimaNews.openArticle(this)'>Leggi</button>".
                "</div></div>";
        }
    }
    class Articles {
        private $articles = array();

        public function __construct() {
            global $connection;
            $connection->connect();
            $results = $connection->query("SELECT id, titolo, descrizione FROM articles order by datacreazione DESC");
            while($row = $results->fetch_assoc()) {
                $article = new Article($row['id'], $row['titolo'], $row['descrizione']);
                $this->articles[$row['id']] = $article;
            }
            $connection->close();
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
    class NewsBar {
        public function getHTML() : string {
            return "<div class='newsbar'><h1>Pubblicazioni</h1></div>";
        }
    }

    echo "<article class='ContentBlock articles'><div class='data'>";
    echo (new NewsBar())->getHTML();
    echo (new Articles())->getHTML();
    echo "</div></article>";
