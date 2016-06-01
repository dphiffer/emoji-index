<?php

// This processes the output from the JavaScript file.

$json = file_get_contents('emoji-index.json');
$index = json_decode($json);
$json_escaped = json_encode($index);
file_put_contents('emoji-escaped.json', $json_escaped);
$json_pretty = json_encode($index, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$json_pretty = str_replace('    ', "\t", $json_pretty);
file_put_contents('emoji-pretty.json', $json_pretty);

?>
