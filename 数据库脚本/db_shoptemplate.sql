t_admint_bigtypet_ordert_ordert_productt_productt_productt_productt_productt_productdb_shop1db_shop1/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 5.7.18-log : Database - db_shoptemplate
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_shoptemplate` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_shoptemplate`;

/*Table structure for table `t_admin` */

DROP TABLE IF EXISTS `t_admin`;

CREATE TABLE `t_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(22) DEFAULT NULL,
  `password` varchar(22) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `t_admin` */

insert  into `t_admin`(`id`,`userName`,`password`) values 
(1,'shop1','123456');

/*Table structure for table `t_bigtype` */

DROP TABLE IF EXISTS `t_bigtype`;

CREATE TABLE `t_bigtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(50) DEFAULT NULL COMMENT '商品大类名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `image` varchar(255) DEFAULT NULL COMMENT '大类封面图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `t_bigtype` */

insert  into `t_bigtype`(`id`,`name`,`remark`,`image`) values 
(1,'手机','手机描述','1.jpg'),
(2,'电脑平板','电脑平板描述','2.jpg'),
(3,'智能穿戴','智能穿戴描述','3.jpg'),
(4,'电视','电视描述','4.jpg'),
(5,'大家电','大家电描述','5.jpg'),
(6,'小家电','小家电描述','6.jpg'),
(7,'智能家居','智能家居描述','7.jpg'),
(8,'户外出行','户外出行描述','8.jpg'),
(9,'日用百货','日用百货描述','9.jpg'),
(10,'儿童用品','儿童用品描述','10.jpg'),
(41,'ds','ds','default.jpg'),
(42,'dsds','ds','default.jpg'),
(43,'22','22','default.jpg');

/*Table structure for table `t_order` */

DROP TABLE IF EXISTS `t_order`;

CREATE TABLE `t_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(100) DEFAULT NULL COMMENT '订单号',
  `userId` varchar(200) DEFAULT NULL COMMENT 'openId微信用户ID',
  `totalPrice` decimal(8,2) DEFAULT NULL COMMENT '总价',
  `address` varchar(300) DEFAULT NULL COMMENT '收货地址',
  `consignee` varchar(20) DEFAULT NULL COMMENT '收货人',
  `telNumber` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `createDate` datetime DEFAULT NULL COMMENT '订单创建日期',
  `payDate` datetime DEFAULT NULL COMMENT '订单支付日期',
  `status` int(11) DEFAULT '1' COMMENT '订单状态 0 未支付 1 已经支付',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

/*Data for the table `t_order` */

insert  into `t_order`(`id`,`orderNo`,`userId`,`totalPrice`,`address`,`consignee`,`telNumber`,`createDate`,`payDate`,`status`) values 
(82,'JAVA20220127032849000000201','o30ur5JpAsAUyGBkR0uW4IxvahR8',2599.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-27 15:28:49','2022-01-27 15:29:06',1),
(83,'JAVA20220129103913000000494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',1),
(84,'JAVA20220129103913000001494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',1),
(85,'JAVA20220129103913000002494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',1),
(86,'JAVA20220129103913000003494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',1),
(87,'JAVA20220129103913000004494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',1),
(88,'JAVA20220129103913000005494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(89,'JAVA20220129103913000006494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(90,'JAVA20220129103913000007494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(91,'JAVA20220129103913000008494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(92,'JAVA20220129103913000009494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(93,'JAVA20220129103913000010494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(94,'JAVA20220129103913000011494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(95,'JAVA20220129103913000012494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',2),
(96,'JAVA20220129103913000013494','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 10:39:13','2022-01-27 15:29:06',3),
(97,'JAVA20220129035805000000052','o30ur5JpAsAUyGBkR0uW4IxvahR8',2599.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 15:58:05','2022-01-29 16:12:26',2),
(98,'JAVA20220129035946000000595','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 15:59:47','2022-01-29 16:14:07',2),
(99,'JAVA20220129040547000000824','o30ur5JpAsAUyGBkR0uW4IxvahR8',3799.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 16:05:48','2022-01-29 16:20:08',2),
(100,'JAVA20220129040836000000654','o30ur5JpAsAUyGBkR0uW4IxvahR8',2599.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 16:08:37','2022-01-29 16:12:52',3),
(101,'JAVA20220129041124000000758','o30ur5JpAsAUyGBkR0uW4IxvahR8',2599.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 16:11:25','2022-01-29 16:11:36',2),
(102,'JAVA20220129043412000000133','o30ur5JpAsAUyGBkR0uW4IxvahR8',3799.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-01-29 16:34:12','2022-01-29 16:34:26',2),
(103,'JAVA20220217071851000000421','o30ur5JpAsAUyGBkR0uW4IxvahR8',2599.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-02-17 19:18:51',NULL,1),
(104,'JAVA20220217072440000000734','o30ur5JpAsAUyGBkR0uW4IxvahR8',2599.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-02-17 19:24:41',NULL,4),
(105,'JAVA20220217072709000000080','o30ur5JpAsAUyGBkR0uW4IxvahR8',17494.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-02-17 19:27:09',NULL,3),
(106,'JAVA20220221080859000000097','o30ur5JpAsAUyGBkR0uW4IxvahR8',7497.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-02-21 08:08:59','2022-02-21 08:09:24',2),
(107,'JAVA20220221082558000000449','o30ur5JpAsAUyGBkR0uW4IxvahR8',31794.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2022-02-21 08:25:58','2022-02-21 08:26:15',3),
(108,'JAVA20240504053340000000216','o30ur5JpAsAUyGBkR0uW4IxvahR8',5198.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2024-05-04 17:33:40',NULL,2),
(109,'JAVA20240504053502000000195','o30ur5JpAsAUyGBkR0uW4IxvahR8',7797.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2024-05-04 17:35:02',NULL,2),
(110,'JAVA20240504053837000000058','o30ur5JpAsAUyGBkR0uW4IxvahR8',5397.00,'广东省广州市海珠区新港中路397号','张三','020-81167888','2024-05-04 17:38:37','2024-05-04 17:38:37',2);

/*Table structure for table `t_order_detail` */

DROP TABLE IF EXISTS `t_order_detail`;

CREATE TABLE `t_order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `mId` int(11) DEFAULT NULL COMMENT '订单主表ID',
  `goodsId` int(11) DEFAULT NULL COMMENT '商品ID',
  `goodsNumber` int(11) DEFAULT NULL COMMENT '商品购买数量',
  `goodsPrice` decimal(8,2) DEFAULT NULL COMMENT '商品单价',
  `goodsName` varchar(100) DEFAULT NULL COMMENT '商品名称',
  `goodsPic` varchar(255) DEFAULT NULL COMMENT '商品图片',
  PRIMARY KEY (`id`),
  KEY `mId` (`mId`),
  CONSTRAINT `t_order_detail_ibfk_1` FOREIGN KEY (`mId`) REFERENCES `t_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;

/*Data for the table `t_order_detail` */

insert  into `t_order_detail`(`id`,`mId`,`goodsId`,`goodsNumber`,`goodsPrice`,`goodsName`,`goodsPic`) values 
(121,82,14,1,2599.00,'Xiaomi Civi','9.png'),
(122,83,14,2,2599.00,'Xiaomi Civi','9.png'),
(123,97,14,1,2599.00,'Xiaomi Civi','9.png'),
(124,98,14,2,2599.00,'Xiaomi Civi','9.png'),
(125,99,4,1,3799.00,'Xiaomi 11','6.png'),
(126,100,14,1,2599.00,'Xiaomi Civi','9.png'),
(127,101,14,1,2599.00,'Xiaomi Civi','9.png'),
(128,102,4,1,3799.00,'Xiaomi 11','6.png'),
(129,103,14,1,2599.00,'Xiaomi Civi','9.png'),
(130,104,14,1,2599.00,'Xiaomi Civi','9.png'),
(131,105,14,2,2599.00,'Xiaomi Civi','9.png'),
(132,105,4,1,3799.00,'Xiaomi 11','6.png'),
(133,105,16,2,1999.00,'小米平板5','13.png'),
(134,105,6,1,4499.00,'Xiaomi 11 Pro','1.png'),
(135,106,5,1,2299.00,'Redmi K40 游戏增强版','11.png'),
(136,106,14,2,2599.00,'Xiaomi Civi','9.png'),
(137,107,14,3,2599.00,'Xiaomi Civi','9.png'),
(138,107,1,2,10999.00,'小米电视大师 82英寸','21.png'),
(139,107,16,1,1999.00,'小米平板5','13.png'),
(140,108,14,2,2599.00,'Xiaomi Civi','9.png'),
(141,109,14,3,2599.00,'Xiaomi Civi','9.png'),
(142,110,14,1,2599.00,'Xiaomi Civi','9.png'),
(143,110,10,2,1399.00,'Note 9 Pro 5G','5.png');

/*Table structure for table `t_product` */

DROP TABLE IF EXISTS `t_product`;

CREATE TABLE `t_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(100) DEFAULT NULL COMMENT '商品名称',
  `price` decimal(8,2) DEFAULT NULL COMMENT '商品价格',
  `stock` int(11) DEFAULT NULL COMMENT '库存',
  `proPic` varchar(255) DEFAULT 'default.jpg' COMMENT '商品图片',
  `isHot` bit(1) DEFAULT b'0' COMMENT '是否热门推荐商品',
  `isSwiper` bit(1) DEFAULT b'0' COMMENT '是否轮播图片商品',
  `swiperPic` varchar(255) DEFAULT 'default.jpg' COMMENT '商品轮播图片',
  `swiperSort` int(11) DEFAULT '0' COMMENT '轮播排序',
  `typeId` int(11) DEFAULT NULL COMMENT '商品类别编号',
  `hotDateTime` datetime DEFAULT NULL COMMENT '设置热卖日期',
  `productIntroImgs` varchar(2000) DEFAULT NULL COMMENT '商品介绍图片',
  `productParaImgs` varchar(2000) DEFAULT NULL COMMENT '商品规格参数图片',
  `description` varchar(2000) DEFAULT NULL COMMENT '商品描述',
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `t_product_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `t_smalltype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*Data for the table `t_product` */

insert  into `t_product`(`id`,`name`,`price`,`stock`,`proPic`,`isHot`,`isSwiper`,`swiperPic`,`swiperSort`,`typeId`,`hotDateTime`,`productIntroImgs`,`productParaImgs`,`description`) values 
(1,'小米电视大师 82英寸',10999.00,3451,'21.png','\0','','2.jpg',3,14,'2021-11-26 21:36:34','\"\"','\"\"','\"\"'),
(4,'Xiaomi 11',3799.00,3232,'6.png','','\0','default.jpg',0,2,'2021-07-28 21:36:34','<img width=\'100%\' src=\'http://localhost/image/productIntroImgs/11.jpg\'></img>','<img width=\'100%\' src=\'http://localhost/image/productParaImgs/11.jpg\'></img>','「全版本领券立减200元，券后价3299元起；享至高24期免息；赠手机保护壳*1;【全款支付套装】赠果冻包」'),
(5,'Redmi K40 游戏增强版',2299.00,2005,'11.png','\0','','1.jpg',1,39,NULL,'\"\"','\"\"','\"\"'),
(6,'Xiaomi 11 Pro',4499.00,2343,'1.png','','\0','default.jpg',0,2,'2021-09-28 21:36:34','\"\"',NULL,NULL),
(7,'Xiaomi MIX FOLD折叠屏手机',7999.00,2222,'2.png','','\0','default.jpg',0,3,'2021-10-28 21:36:34','\"\"',NULL,NULL),
(8,'Note 9 5G',1199.00,1111,'3.png','','\0','default.jpg',0,40,'2021-09-28 21:36:34','\"\"',NULL,NULL),
(9,'Xiaomi 10S',2999.00,1111,'4.png','','\0','default.jpg',0,2,'2021-12-28 21:36:34','\"\"',NULL,NULL),
(10,'Note 9 Pro 5G',1399.00,2222,'5.png','','\0','default.jpg',0,40,'2021-11-28 21:36:34','\"\"',NULL,NULL),
(11,'黑鲨4',2499.00,3322,'7.png','','\0','default.jpg',0,41,'2021-11-28 21:36:34','\"\"',NULL,NULL),
(12,'Redmi  K40 Pro 系列',2499.00,3244,'8.png','','\0','default.jpg',0,39,'2021-11-28 21:36:34',NULL,NULL,NULL),
(14,'Xiaomi Civi',2599.00,4444,'9.png','\0','\0','default.jpg',0,1,NULL,'<img width=\'100%\' src=\'http://192.168.0.116/image/productIntroImgs/1.jpg\'></img><img width=\'100%\' src=\'http://192.168.0.116/image/productIntroImgs/2.jpg\'></img><img width=\'100%\' src=\'http://localhost/image/productIntroImgs/3.jpg\'></img>','<img width=\'100%\' src=\'http://192.168.0.116/image/productParaImgs/1.jpg\'></img><img width=\'100%\' src=\'http://localhost/image/productParaImgs/2.jpg\'></img>','「购机至高享24期免息；赠Redmi AirDots 2真无线蓝牙耳机；赠Keep会员7天体验卡；+110元得Air2 SE蓝牙耳机」'),
(15,'Xiaomi 11 Ultra',5499.00,4444,'10.png','\0','\0','default.jpg',0,2,NULL,NULL,NULL,NULL),
(16,'小米平板5',1999.00,444,'13.png','\0','\0','default.jpg',0,5,NULL,'<img src=\'http://192.168.0.116/image/productIntroImgs/111.jpg\'></img><img width=\'100%\' src=\'http://192.168.0.116/image/productIntroImgs/222.jpg\'></img><img width=\'100%\' src=\'http://localhost/image/productIntroImgs/333.jpg\'></img>','<img width=\'100%\' src=\'http://localhost/image/productParaImgs/111.jpg\'></img>','11英寸大屏 2.5K超清显示 120Hz高刷新率'),
(17,'小米平板5 Pro',2499.00,444,'14.png','\0','\0','default.jpg',0,5,NULL,NULL,NULL,NULL),
(19,'RedmiBook Pro 15 增强版',5299.00,444,'15.png','\0','\0','default.jpg',0,6,NULL,NULL,NULL,NULL),
(20,'Redmi G 2021',6499.00,1999,'16.png','\0','','3.jpg',2,6,NULL,NULL,NULL,NULL),
(21,'Redmi G 2021 锐龙版',7499.00,2000,'17.png','\0','\0','default.jpg',0,6,NULL,NULL,NULL,NULL),
(22,'RedmiBook Pro 14 增强版',4999.00,777,'18.png','\0','\0','default.jpg',0,6,NULL,NULL,NULL,NULL),
(23,'小米笔记本 Pro 14 锐龙版',5499.00,666,'19.png','\0','\0','default.jpg',0,7,NULL,NULL,NULL,NULL),
(24,'小米笔记本 Pro 14 增强版',5499.00,666,'20.png','\0','\0','default.jpg',0,7,NULL,NULL,NULL,NULL),
(26,'1',1.00,1,'default.jpg','\0','\0','default.jpg',0,6,NULL,'1','1',NULL),
(27,'1',2.00,3,'default.jpg','\0','\0','default.jpg',0,6,NULL,'5','6','4'),
(28,'2',3.00,4,'default.jpg','\0','\0','default.jpg',0,6,NULL,'6','7','5'),
(29,'1',1.00,1,'default.jpg','\0','\0','default.jpg',0,11,NULL,'1','1','1'),
(30,'223335552',322.00,22355,'default.jpg','\0','\0','default.jpg',0,6,NULL,'22333522','22333544442','22333511');

/*Table structure for table `t_product_swiper_image` */

DROP TABLE IF EXISTS `t_product_swiper_image`;

CREATE TABLE `t_product_swiper_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `image` varchar(255) DEFAULT NULL COMMENT '图片',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `productId` int(11) DEFAULT NULL COMMENT '所属商品id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `t_product_swiper_image` */

insert  into `t_product_swiper_image`(`id`,`image`,`sort`,`productId`) values 
(1,'1.jpg',1,14),
(2,'2.jpg',2,14),
(3,'3.jpg',3,14),
(4,'4.jpg',4,14),
(5,'5.jpg',5,14),
(6,'6.jpg',6,14),
(7,'7.jpg',7,14),
(8,'11.jpg',1,4),
(9,'22.jpg',2,4),
(10,'33.jpg',3,4),
(11,'44.jpg',4,4),
(12,'111.jpg',1,16),
(13,'222.jpg',2,16),
(14,'333.jpg',3,16);

/*Table structure for table `t_smalltype` */

DROP TABLE IF EXISTS `t_smalltype`;

CREATE TABLE `t_smalltype` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(50) DEFAULT NULL COMMENT '商品小类',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `bigTypeId` int(11) DEFAULT NULL COMMENT '商品大类编号',
  PRIMARY KEY (`id`),
  KEY `bigTypeId` (`bigTypeId`),
  CONSTRAINT `t_smalltype_ibfk_1` FOREIGN KEY (`bigTypeId`) REFERENCES `t_bigtype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

/*Data for the table `t_smalltype` */

insert  into `t_smalltype`(`id`,`name`,`remark`,`bigTypeId`) values 
(1,'Xiaomi Civi','Xiaomi Civi',1),
(2,'Xiaomi 数字系列','Xiaomi 数字系列',1),
(3,'Xiaomi MIX系列','Xiaomi MIX系列',1),
(5,'小米平板','小米平板',2),
(6,'RedmiBook','RedmiBook',2),
(7,'小米笔记本','小米笔记本',2),
(10,'耳机','耳机',3),
(11,'手表','手表',3),
(12,'手环','手环',3),
(13,'电视','电视',4),
(14,'小米电视大师','小米电视大师',4),
(15,'电视配件','电视配件',4),
(16,'空调','空调',5),
(17,'洗衣机','洗衣机',5),
(18,'冰箱','冰箱',5),
(19,'厨房大电','厨房大电',5),
(20,'厨房小电','厨房小电',6),
(21,'清洁电器','清洁电器',6),
(22,'环境电器','环境电器',6),
(23,'生活电器','生活电器',6),
(24,'小爱音箱','小爱音箱',7),
(25,'路由器','路由器',7),
(26,'智能安防','智能安防',7),
(27,'智能控制','智能控制',7),
(28,'户外出行','户外出行',8),
(29,'箱包','箱包',8),
(30,'家具日用','家具日用',9),
(31,'防护清洁','防护清洁',9),
(32,'会员定制','会员定制',9),
(33,'个人护理','个人护理',9),
(34,'健康','健康',9),
(35,'鞋服配饰','鞋服配饰',9),
(36,'床品家居','床品家居',9),
(37,'礼品周边','礼品周边',9),
(38,'儿童用品','儿童用品',10),
(39,'Redmi K系列','K系列',1),
(40,'Redmi Note系列','Note系列',1),
(41,'游戏手机','游戏手机',1),
(44,'22','22',3),
(45,'是','3 是',2),
(46,'ewew','ew',3),
(47,'rrr','rrr',2),
(48,'43','4343',2),
(49,'5','55',4),
(50,'12','22',7);

/*Table structure for table `t_wxuserinfo` */

DROP TABLE IF EXISTS `t_wxuserinfo`;

CREATE TABLE `t_wxuserinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `openid` varchar(30) DEFAULT NULL COMMENT '用户唯一标识',
  `nickName` varchar(50) DEFAULT NULL COMMENT '用户昵称',
  `avatarUrl` varchar(200) DEFAULT NULL COMMENT '用户头像图片的 URL',
  `registerDate` datetime DEFAULT NULL COMMENT '注册日期',
  `lastLoginDate` datetime DEFAULT NULL COMMENT '最后登录日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `t_wxuserinfo` */

insert  into `t_wxuserinfo`(`id`,`openid`,`nickName`,`avatarUrl`,`registerDate`,`lastLoginDate`) values 
(5,'o30ur5JpAsAUyGBkR0uW4IxvahR8','小锋@java1234&python222','https://thirdwx.qlogo.cn/mmopen/vi_32/GJeHhQSiczuph0tg4JyleLeDUnIghqXlQBiaUAJMvia8GRSjibYdPmFQrvPic6sAhyTz4C8Ivu1aWah3KpFMBdsPibEw/132','2022-01-08 22:19:11','2024-05-04 17:26:37');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
