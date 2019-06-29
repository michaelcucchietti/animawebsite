<?php
    abstract class MenuItem {
        private $linkid, $value;
        function __construct($linkid, $value) {
            $this->linkid = $linkid;
            $this->value = $value;
        }

        /**
         * @return mixed
         */
        protected function getLinkid()
        {
            return $this->linkid;
        }

        /**
         * @return mixed
         */
        protected function getValue()
        {
            return $this->value;
        }


        abstract function getHTML() : string;
    }
    class SmartphoneMenuItem extends MenuItem {

        function getHTML(): string
        {
            return "<a class=\"MenuEntry\" link-id=\"".$this->getLinkid()."\" onclick=\"AnimaSections.open(this)\">".$this->getValue()."</a>";
        }
    }
    class DesktopMenuItem extends MenuItem {

        function getHTML(): string
        {
            $html = "<a class=\"MenuEntry\" link-id=\"".$this->getLinkid()."\" onclick=\"AnimaSections.open(this)\">";
            $html .= "<div class=\"aligner\"><div class=\"icon\"><div class=\"media ".$this->getLinkid()."\"></div></div></div>";
            $html .= "<div class=\"text\">".$this->getValue()."</div></a>";

            return $html;
        }
    }
    class MenuItems {
        private $items = array();
        public function addItem($item) : void {
            $this->items[count($this->items)] = $item;
        }
        public function getItems() {
            return $this->items;
        }
    }

    abstract class MenuButton {
        abstract function getHTML() : string;
    }
    class SmartphoneMenuButton extends MenuButton {
        function getHTML(): string
        {
            return "<a class=\"MenuButton\"></a>";
        }
    }
    class DesktopMenuButton extends MenuButton {
        function getHTML(): string
        {
            return "<a class=\"MenuButton\"><div class=\"child\"><div class=\"icon\"></div></div></a>";
        }
    }

    abstract class Menu {
        private $menuButton;
        private $items;
        private $mobileMenu;
        private $mainRow;

        function __construct($mobileMenu) {
            $this->mobileMenu = $mobileMenu;
            $this->items = new MenuItems();
            if($mobileMenu) {
                $this->menuButton = new SmartphoneMenuButton();
                $this->mainRow = "<div class=\"MenuBar displayFlexSmartphone\" id=\"menuBar_smartphone\">";
            } else {
                $this->menuButton = new DesktopMenuButton();
                $this->mainRow = "<div class=\"MenuBar displayFlexDesktop\" id=\"menuBar_desktop\">";
            }

            $this->addItem("home", "Home");
            $this->addItem("digitals", "Digitals");
            $this->addItem("logostudio", "Logo Studio");
            $this->addItem("comingsoon", "Coming Soon");

        }

        private function addItem($idlink, $value) {
            if($this->mobileMenu)
                $this->items->addItem(new SmartphoneMenuItem($idlink, $value));
            else
                $this->items->addItem(new DesktopMenuItem($idlink, $value));
        }

        protected function getMenuButton(): MenuButton {
            return $this->menuButton;
        }

        protected function getItems() {
            return $this->items->getItems();
        }

        function getHTML() : string {
            $html = $this->mainRow;
            $html .= $this->getMenuButton()->getHTML();
            $html .= "<nav class=\"MenuEntries\">";

            $length = count($this->getItems());
            for($i = 0; $i < $length; $i++) {
                $item = ($this->getItems())[$i];
                $html .= $item->getHTML();
            }
            $html .= "</nav></div>";
            return $html;
        }

    }
    class DesktopMenu extends Menu {
        public function __construct() {
            parent::__construct(false);
        }
    }
    class SmartphoneMenu extends Menu {
        public function __construct() {
            parent::__construct(true);
        }
    }
