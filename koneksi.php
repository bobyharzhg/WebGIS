<?php
/**
*
*/
class Koneksi
{

    private $host="localhost";
    private $user="root";
    private $password="";
    private $db="hotspot_riau";

    function __construct()
    {
        $con = mysqli_connect($this->host, $this->user, $this->password, $this->db);

        if(mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }else{
            echo "Connect";
        }
    }

    function getKoneksi(){
        $con = mysqli_connect($this->host, $this->user, $this->password, $this->db);

        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }else{
            echo "Connect";
        }
        return $con;
    }

}