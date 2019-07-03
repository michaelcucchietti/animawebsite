<?php

class Connection {
    private $server, $db_name, $username, $password;
    private $conn;
    private $connected = false;
    public function __construct($server, $db_name, $username, $password) {
        $this->server = $server;
        $this->db_name = $db_name;
        $this->username = $username;
        $this->password = $password;
    }

    public function connect() : bool {
        $this->conn = new mysqli($this->server, $this->username, $this->password, $this->db_name);
        if($this->conn->connect_error) {
            $this->connected = false;
            return false;
        } else {
            $this->connected = true;
            return true;
        }
    }
    public function close() : void {
        if(!$this->connected) {
            return;
        }
        mysqli_close($this->conn);
        $this->connected = false;
    }

    /**
     * @param $sql define a query (select, insert, update, ...)
     * @return mixed
     */
    public function query($sql)  {
        return ($this->conn)->query($sql);
    }
    public function getConnection() {
        return $this->conn;
    }
    public function isConnected() : bool {
        return $this->connected;
    }
}
class MyTestConnection extends Connection
{
    public function __construct()
    {
        parent::__construct("localhost", "animatest", "test", "test1234");
    }
}
class SiteGroundConnection extends Connection {
    public function __construct()
    {
        parent::__construct("localhost", "insidea7_publications2", "insidea7_pubs2", "Koporge@18");
    }
}

$connection = new SiteGroundConnection();
