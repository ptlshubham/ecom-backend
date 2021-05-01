const express = require("express");
const router = express.Router();
const db = require("../db/db");
const multer = require('multer');
const path = require('path');
const config = require("../../config");
var midway = require('./midway');
const jwt = require('jsonwebtoken');


router.post("/SaveUserRegister",midway.checkToken, (req, res, next) => {
    // bcryt.genSalt(10, function (err, salt) {
    //     bcryt.hash(req.body.password, salt, (err, hash) => {

    //     })
    // })
    console.log(req.body.dateofbirth);
    db.executeSql("INSERT INTO `user`(`firstname`,`middlename`,`lastname`,`email`,`password`,`dateofbirth`,`gender`,`contactnumber`,`isactive`,`createddate`)VALUES('" + req.body.firstname + "','" + req.body.middlename + "','" + req.body.lastname + "','" + req.body.email + "','" + req.body.password + "',CURRENTTIMESTAMP," + req.body.gender + "," + req.body.contactnumber + "," + req.body.isactive + ",CURRENT_TIMESTAMP);", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});

router.post("/SaveAddress", (req, res, next) => {
 
    console.log(req.body);
    db.executeSql("INSERT INTO `useraddress`(`userid`,`name`,`contactnumber`,`pincode`,`locality`,`address`,`city`,`state`,`landmark`,`alternativeno`,`createddate`)VALUES(" + req.body.userid + ",'" + req.body.name + "'," + req.body.contactnumber + "," + req.body.pincode + ",'" + req.body.locality + "','" + req.body.address + "','" + req.body.city + "','" + req.body.state + "','" + req.body.landmark + "'," + req.body.alternativeno + ",CURRENT_TIMESTAMP);", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});
router.post("/RemoveUserAddress", midway.checkToken, (req, res, next) => {
    console.log("ghjsjgd");
    console.log(req.body.id);
    db.executeSql("Delete from useraddress where id=" + req.body.id, function (data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/UpdateUserAddress", (req, res, next) => {
    console.log(req.body)
    db.executeSql("UPDATE `ecommerce`.`useraddress` SET name=" + req.body.name + ",contactnumber=" + req.body.contactnumber +",pincode="+req.body.pincode+",locality='"+req.body.locality+"',address='"+req.body.address+"',city='"+req.body.city+"',landmark='"+req.body.landmark+"',alternativeno="+req.body.alternativeno+",updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.get("/GetUserAddress/:id", (req, res, next) => {
    console.log(req.params.id);
    db.executeSql("select * from useraddress where userid =" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.post("/saveAddToCart",midway.checkToken, (req, res, next) => {

    console.log(req.body);
    db.executeSql("INSERT INTO `cartlist`(`userid`,`productid`,`createddate`)VALUES(" + req.body.userid + "," + req.body.productid + ",CURRENT_TIMESTAMP);", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});

router.post("/saveToWishList",midway.checkToken, (req, res, next) => {
    console.log(req.body)
    db.executeSql("INSERT INTO `wishlist`(`userid`,`productid`)VALUES(" + req.body.userid + "," + req.body.productid + ");", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });

});
router.get("/GetProductList", (req, res, next) => {
    db.executeSql("select * from product ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetStateList", (req, res, next) => {
    db.executeSql("select * from state ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetCategoryList/:id", (req, res, next) => {
    console.log("hello");
    console.log(req.params.id);
    db.executeSql("select * from category where isactive=1 AND parent =" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetCartList",midway.checkToken, (req, res, next) => {
    db.executeSql("select cl.id, cl.userid,cl.productid,p.id as ProductId,p.productName,p.brandName,p.manufacturerName,p.startRating,p.productPrice,p.discountPrice,p.avibilityStatus,p.descripition,p.productMainImage from cartlist cl join product p on cl.productid=p.id ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.get("/GetWishList",midway.checkToken, (req, res, next) => {
    db.executeSql("select wl.id, wl.userid,wl.productid,p.id as ProductId,p.productName,p.brandName,p.manufacturerName,p.startRating,p.productPrice,p.discountPrice,p.avibilityStatus,p.descripition,p.productMainImage from wishlist wl join product p on wl.productid=p.id ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetProductDetails/:id", (req, res, next) => {
    db.executeSql("select * from product where id =" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetProductImages/:id", (req, res, next) => {
    console.log(req.body.userid)
    db.executeSql("select * from images where productid =" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.post("/SaveMainCategory", (req, res, next) => {
    console.log(req.body.name);
    db.executeSql("INSERT INTO `category`(`name`,`parent`,`createddate`,`updateddate`,`isactive`)VALUES('" + req.body.name + "'," + req.body.parent + ",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP," + req.body.isactive + ");", function(data, err) {
        if (err) {
            res.json("error");
        } else {
            res.json("success");
        }
    });
});

router.get("/RemoveCartList/:id",midway.checkToken, (req, res, next) => {
    db.executeSql("Delete from cartlist where id=" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/RemoveWishList/:id", midway.checkToken,(req, res, next) => {
    console.log(req.body)
    db.executeSql("Delete from wishlist where id=" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/SaveBankListCategory", (req, res, next) => {
    console.log(req.body.name);
    db.executeSql("INSERT INTO `banklist`(`bankname`)VALUES('" + req.body.bankname + "');", function(data, err) {
        if (err) {
            res.json("error");
        } else {
            res.json("success");
        }
    });
});


router.get("/GetReviewList", (req, res, next) => {
    db.executeSql("select * from ratings ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetBankList", (req, res, next) => {
    db.executeSql("select * from banklist ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/GetCustomerList", (req, res, next) => {
    db.executeSql("select * from user ", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.get("/GetMainCategory/:id", (req, res, next) => {
    db.executeSql("select * from category where isactive=1 AND parent =" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/UpdateMainCategory", (req, res, next) => {
    db.executeSql("UPDATE `ecommerce`.`category` SET name='" + req.body.name + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});
router.post("/UpdateCategory", (req, res, next) => {
    db.executeSql("UPDATE `ecommerce`.`category` SET parent=" + req.body.parent + ",name='" + req.body.name + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});

router.get("/RemoveMainCategory/:id", (req, res, next) => {
    db.executeSql("UPDATE `ecommerce`.`category` SET updateddate=CURRENT_TIMESTAMP,isactive=0 WHERE id=" + req.params.id + ";", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.post("/SaveAddProducts", (req, res, next) => {
    console.log(req.body);
    db.executeSql("INSERT INTO `product`(`productName`,`brandName`,`manufacturerName`,`productCode`,`startRating`,`productSRNumber`,`productPrice`,`discountPrice`,`emiOptions`,`avibilityStatus`,`descripition`,`relatedProduct`,`productSize`,`itemWeight`,`isActive`,`mainCategory`,`category`,`subCategory`,`productMainImage`,`createddate`)VALUES('" + req.body.productName + "','" + req.body.brandName + "','" + req.body.manufacturerName + "'," + req.body.productCode + "," + req.body.startRating + ",'" + req.body.productSRNumber + "'," + req.body.productPrice + "," + req.body.discountPrice + "," + req.body.emiOptiions + "," + req.body.avibilityStatus + ",'" + req.body.descripition + "'," + req.body.relatedProduct + ",'" + req.body.productSize + "','" + req.body.itemWeight + "'," + req.body.isActive + "," + req.body.mainCategory + "," + req.body.category + "," + req.body.subCategory + ",'" + req.body.productMainImage + "',CURRENT_TIMESTAMP);", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            console.log(data);
            db.executeSql("SELECT id FROM product ORDER BY createddate DESC LIMIT 1", function(data1, err) {
                if (err) {
                    console.log("Error in store.js", err);
                } else {
                    console.log(req.body.selectedSize);
                    req.body.selectedSize.forEach(element => {
                        db.executeSql("INSERT INTO `quantitywithsize`(`productid`,`quantity`,`size`)VALUES(" + data1[0].id + ",'" + element.quantity + "','" + element.selsize + "');", function(data, err) {
                            if (err) {
                                console.log("Error in store.js", err);
                            } else {

                            }
                        });

                    })


                }
            });

        }
        // req.body.addSelectFields.forEach(element=>{

        //     });

    })
    res.json("success");
});
router.post("/UpdateReviews", (req, res, next) => {
    console.log(req.body)
    db.executeSql("UPDATE `ecommerce`.`ratings` SET rating=" + req.body.rating + ",comment='" + req.body.comment + "',updateddate=CURRENT_TIMESTAMP WHERE id=" + req.body.id + ";", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
});


router.get("/RemoveReviews/:id", (req, res, next) => {

    console.log(req.params.id);
    db.executeSql("Delete from ratings where id=" + req.params.id, function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})


router.post("/UploadProductImage", (req, res, next) => {
    var imgname = generateUUID();

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'images/products');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {

            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function(err) {
        console.log("path=", config.url + 'images/products/' + req.file.filename);

        if (req.fileValidationError) {
            console.log("err1", req.fileValidationError);
            return res.json("err1", req.fileValidationError);
        } else if (!req.file) {
            console.log('Please select an image to upload');
            return res.json('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            console.log("err3");
            return res.json("err3", err);
        } else if (err) {
            console.log("err4");
            return res.json("err4", err);
        }
        return res.json('/images/products/' + req.file.filename);

        console.log("You have uploaded this image");
    });
});

router.post("/UploadMultiProductImage", (req, res, next) => {
    var imgname = generateUUID();

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'images/products');
        },
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {

            cb(null, imgname + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function(err) {
        console.log("body=", req.body.catid);
        console.log("path=", config.url + '/images/products/' + req.file.filename);
        db.executeSql("INSERT INTO `images`(`mainCategoryId`,`categoryId`,`subCategoryId`,`productListImage`,`createddate`)VALUES(" + req.body.catid + "," + req.body.subcatid + "," + req.body.grandchild + ",'/images/products/" + req.file.filename + "',CURRENT_TIMESTAMP);", function(data, err) {
            if (err) {
                console.log("Error in store.js", err);
            } else {

            }
        });

        if (req.fileValidationError) {
            console.log("err1", req.fileValidationError);
            return res.json("err1", req.fileValidationError);
        } else if (!req.file) {
            console.log('Please select an image to upload');
            return res.json('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            console.log("err3");
            return res.json("err3", err);
        } else if (err) {
            console.log("err4");
            return res.json("err4", err);
        }
        return res.json('/images/products/' + req.file.filename);
        console.log("You have uploaded this image");
    });
});


router.get("/RemoveRecentUoloadImage", (req, res, next) => {
    console.log(req.body);
    db.executeSql("SELECT * FROM images ORDER BY createddate DESC LIMIT 1", function(data, err) {
        if (err) {
            console.log("Error in store.js", err);
        } else {
            return res.json(data);
        }
    });
})

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}

module.exports = router;