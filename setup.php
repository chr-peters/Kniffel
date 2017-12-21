<?php
$config_file = './webcontent/config.php';
 
$db_host = getenv('DB_HOST');
$db_name = getenv('DB_NAME');
$db_user = getenv('DB_USER');
$db_passwd = getenv('DB_PASSWD');
$path_mysql = getenv('MYSQL_PATH');
 
if(!$db_host){
    $db_host = 'auravendill.de';
}
if(!$db_name){
    $db_name = 'kniffel';
}
if(!$db_user){
    $db_user = 'Kniffelmaster';
}
if(!$db_passwd){
    $db_passwd = 'TODO: ENTER PW';
}
if(!$path_mysql){
    $path_mysql = 'C:\xampp\mysql\bin\mysql';
}
 
$file_contents = "<?php\n\$db_host = '" . $db_host . "';\n"
    . "\$db_user = '" . $db_user . "';\n"
    . "\$db_passwd = '" . $db_passwd . "';\n"
    . "\$db_name = '" . $db_name . "';\n";
 
// write database config to file
file_put_contents($config_file, $file_contents);
echo error_get_last();
