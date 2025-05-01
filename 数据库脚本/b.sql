update 表名 set 字段名=REPLACE (字段名,'原来的值','要修改的值')

update  t_product as a set a.`productIntroImgs`=REPLACE (a.`productIntroImgs`,'192.168.0.116','localhost:8081') ;

update  t_product as a set a.`productParaImgs`=REPLACE (a.`productParaImgs`,'192.168.0.116','localhost:8081') ;