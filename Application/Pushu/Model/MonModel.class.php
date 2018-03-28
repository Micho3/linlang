<?php
/**
 * Created by PhpStorm.
 * User: shepg
 * Date: 2018/2/7
 * Time: 13:44
 */

namespace Pushu\Model;
//use Think\Model;

class MonModel {
    protected $connection = array(
        'db_type' => 'mongo',
        'db_user' => '',
        'db_pwd' => '',
        'db_host' => '39.106.28.159',
        'db_port' => '27017',
    );
    protected $mongo = null;
    protected $dbName = "LL_Pushu";

    public function __construct()
    {
        if($this->mongo !== null){
            return $this->mongo;
        }
        $this->connectMongo();
        $this->mongo = "0chi";
        return $this->mongo;
    }
    private function connectMongo(){
        $m = new \MongoClient('mongodb://39.106.28.159:27017');
        var_dump($m);exit;
    }
}