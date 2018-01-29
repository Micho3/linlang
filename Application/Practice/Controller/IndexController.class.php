<?php
namespace Practice\Controller;
use Think\Controller;
class IndexController extends Controller {
    private $viewPath = "Application/Practice/View";
    public function index(){
        $this->display();
    }

    public function trunk(){
        $model = M('Conf');
        $data = $model->where("type='trunk'")->select();
        $result = array();
        foreach($data as $key => $value){
            if($value['level'] == 0){
                $value['child']= array();
                foreach($data as $k => $v){
                    if($v['pid'] == $value['id']){
                        array_push($value['child'], $v);
                    }
                }
                array_push($result, $value);
            }
        }
        $this->ajaxReturn($result);
    }

    public function getPractice(){
        $page = isset($_GET['page'])?$_GET['page']:null;
        if($page != null && is_file($this->viewPath."/Index/{$page}.html")){
            $this->display("{$page}");
        }
        else{
            throw new Exception("Page Not Found!");
        }
    }
}

