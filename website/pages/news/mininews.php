<?php
    require "MyTestConnection.php";
    class MiniItem {
        private $titolo, $id;

        /**
         * MiniItem constructor.
         * @param $titolo
         * @param $id
         */
        public function __construct($id, $titolo)
        {
            $this->titolo = $titolo;
            $this->id = $id;
        }

        /**
         * @return string
         */
        public function getTitolo() : string
        {
            return $this->titolo;
        }

        /**
         * @return string
         */
        public function getId() : string
        {
            return $this->id;
        }

        function getHTML() : string {
            return "<span class=\"element\" anima-article-id=\"".$this->getId()."\">".$this->getTitolo()."</span>";
        }

    }
    class MiniNews {
        private $items = array();

        public function __construct() {
            global $connection;
            $wasOpened = false;                     // Suppose that connection was closed
            if(!$connection->isConnected())
                $connection->connect();             // If closed then connect
            else
                $wasOpened = true;                  // Otherwise notify cannection was already opened


            $results = $connection->query("Select id, titolo from articles order by datacreazione DESC limit 3");
            $counter = 0;
            while($row = $results->fetch_assoc()) {
                $this->items[$counter++] = new MiniItem($row['id'], $row['titolo']);
            }
            if(!$wasOpened)
                $connection->close();               // if connection was closed, then close it again, otherwise maintain connection status
        }

        public function getHTML() : string {
            $html = "";
            for($i = 0; $i < count($this->items); $i++) {
                $html .= $this->items[$i]->getHTML();
            }
            return $html;
        }
    }