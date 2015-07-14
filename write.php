<?php

    $input = $_POST['ID'];
    $number = $_POST['fileNumber'];
    $filename = "result/".$number.'_'.$input.'.txt';


    if(file_exists($filename)){
        echo $filename."はすでに存在します。\n";
    }else{
        echo $filename."が存在しないので作成します。\n";
        touch($filename);
        chmod($filename, 0766);
    }

    // $fp = fopen($filename, "a");

    // $write_text = $_POST['name'] + ':' + $_POST['ans'] + "\n";

    // if ($_POST{"write"}){
    // fwrite($fp, "はじめまして");
    // fwrite($fp, $write_text);
    // print "書き込み完了しました。\n";
    // print $_POST['name']."\n";
    // print $_POST['ans']."\n";
    // // }
    // fclose($fp);

    // ファイルをオープンして既存のコンテンツを取得します 
    $current = file_get_contents($filename);
    // 新しい人物をファイルに追加します
    $current = ($_POST['name'].' : '.$_POST['ans'].' : '.$_POST['time']);
    // 結果をファイルに書き出します
    file_put_contents($filename, $current, FILE_APPEND);

    file_put_contents($filename, "\n", FILE_APPEND);

?>