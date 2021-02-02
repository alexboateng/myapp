const express = require('express');

const router = express.Router();
const { IcdCode, validateCode } = require('../models/codeModel');
const { IcdVersion } = require('../models/icdVersion');


//// update driver socket id
router.post('/:appVersion', (req, res) => {
    let diagnosisCode= null;
    let fullCode= null;
    let abbrDesc= null;
    let fullDesc= null;
    let categoryCode= null;
    let categoryTitle= null;
    let appVersion= req.params.appVersion || null;

    if(req.body) {
        diagnosisCode= req.body.diagnosisCode || null;
        fullCode= req.body.fullCode || null;
        abbrDesc= req.body.abbrDesc || null;
        fullDesc= req.body.fullDesc || null;
        categoryTitle= req.body.categoryTitle || null;
        categoryCode= req.body.categoryCode || null;
    }
    
    if (!appVersion) {
        res.status(400).json({
            status: 'error',
            msg: "App Version is required",
        });
    } else 
    if (!diagnosisCode || !fullCode || !abbrDesc || !fullDesc || !categoryTitle || !categoryCode) {
        //res.sendStatus(400);
        res.status(400).json({
            status: 'error',
            msg: "All Fields are required",
        });
    } else {
        dataToAdd = {
            diagnosisCode,
            fullCode,
            abbrDesc,
            fullDesc,
            categoryTitle,
            categoryCode,
            appVersion
        }
        const icdCode = new IcdCode(dataToAdd);


        // Check if version exist
        IcdVersion.find()
            .or([{ version: appVersion }])
            .countDocuments()
            .then((count) => {
                if (count < 1) {
                    res.status(400).json({
                        status: 'error',
                        msg: "Invalid ICD Version",
                    });
                } else {
                        // Check if icd code is already added to version
                        IcdCode.find()
                        .and([{ diagnosisCode, appVersion }])
                        .countDocuments()
                        .then((count) => {
                            if (count > 0) {
                                res.status(400).json({
                                    status: 'error',
                                    msg: "ICD with diagnosis code already added",
                                });
                            } else {
                                icdCode.save()
                                    .then((savedData) => {
                                        res.json({
                                            status: 'success',
                                            msg: savedData,
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(422).json({
                                            status: 'err',
                                            msg: "Server Error 3",
                                        });
                                    });
                            }
                        })
                        .catch((err) => {
                            res.status(422).json({
                                status: 'err',
                                msg: "Server Error 4",
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(422).json({
                    status: 'err',
                    msg: "Server Error 5",
                });
            });
    }
});


router.get("/:appVersion/:id", (req, res) => {        
    let appVersion= req.params.appVersion || null;
    // Check if version exist
    IcdVersion.find()
        .or([{ version: appVersion }])
        .countDocuments()
        .then((count) => {
            if (count < 1) {
                res.status(400).json({
                    status: 'error',
                    msg: "Invalid ICD Version",
                });
            } else {
                IcdCode.find()
                  .or([{ _id: req.params.id, appVersion }])
                  .then(icdData => {
                    if (!icdData || !icdData.length)
                      return res.status(400).json({
                        status: 'error',
                        msg: "Icd Code with id not found",
                    });
                      res.json({
                          status: 'success',
                          msg: icdData,
                      });
                  })
                  .catch(error => {
                    res.status(422).json({
                        status: 'err',
                        msg: "Server Error",
                    });
                  });
            }
        })
        .catch((err) => {
            res.status(422).json({
                status: 'err',
                msg: "Server Error 5",
            });
        });
  });

router.put('/:appVersion/:id', (req, res) => {
    let appVersion= req.params.appVersion || null;

    let diagnosisCode= null;
    let fullCode= null;
    let abbrDesc= null;
    let fullDesc= null;
    let categoryCode= null;
    let categoryTitle= null;

    if(req.body) {
        diagnosisCode= req.body.diagnosisCode || null;
        fullCode= req.body.fullCode || null;
        abbrDesc= req.body.abbrDesc || null;
        fullDesc= req.body.fullDesc || null;
        categoryTitle= req.body.categoryTitle || null;
        categoryCode= req.body.categoryCode || null;
    }

    if (!appVersion) {
        res.status(400).json({
            status: 'error',
            msg: "App Version is required",
        });
    } else 
    if (!diagnosisCode || !fullCode || !abbrDesc || !fullDesc || !categoryTitle || !categoryCode) {
        //res.sendStatus(400);
        res.status(400).json({
            status: 'error',
            msg: "All Fields are required",
        });
    } else {
        const updateId = req.params.id;
        dataToUpdate = {
            diagnosisCode,
            fullCode,
            abbrDesc,
            fullDesc,
            categoryTitle,
            categoryCode,
            appVersion
        }

        IcdVersion.find()
        .or([{ version: appVersion }])
        .countDocuments()
        .then((count) => {
            if (count < 1) {
                res.status(400).json({
                    status: 'error',
                    msg: "Invalid ICD Version",
                });
            } else {
                IcdCode.findOne({ _id: updateId, appVersion })
                    .then((icdData) => {
                        if (!icdData)
                          return res.status(400).json({
                            status: 'error',
                            msg: "Icd Code with id not found",
                        });
                        IcdCode.updateOne({ _id: updateId }, dataToUpdate)
                            .then((savedData) => {
                                res.json({
                                    status: 'success',
                                    msg: "Updated Successfully",
                                });
                            })
                            .catch((err) => {
                                res.status(422).json({
                                    status: 'err',
                                    msg: "Server Error",
                                });
                            });
                    })
                    .catch((err) => {
                        res.status(422).json({
                            status: 'err',
                            msg: "Server Error",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(422).json({
                status: 'err',
                msg: "Server Error 5",
            });
        });
    }
});

router.get('/:appVersion', (req, res) => {
    let appVersion= req.params.appVersion || null;
    let numberQuery = req.query.page - 1;

    if (numberQuery < 1) {
        numberQuery = 0;
    }

    const pageOptions = {
        page: parseInt(numberQuery, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 20
    }
    
    IcdVersion.find()
        .or([{ version: appVersion }])
        .countDocuments()
        .then((count) => {
            if (count < 1) {
                res.status(400).json({
                    status: 'error',
                    msg: "Invalid ICD Version",
                });
            } else {
                IcdCode.find()
                .or([{ appVersion }])
                    .skip(pageOptions.page * pageOptions.limit)
                    .limit(pageOptions.limit)
                    .exec(function (err, icdData) {
                        if(err) {
                            res.status(422).json({
                                status: 'err',
                                msg: "Server Error",
                            }); return; };
                            res.json({
                                status: 'success',
                                page: req.query.page,
                                msg: icdData, 
                            });
                    });
            }
        })
        .catch((err) => {
            res.status(422).json({
                status: 'err',
                msg: "Server Error 5",
            });
        });
});

router.delete('/:appVersion/:id', (req, res) => {
    let appVersion= req.params.appVersion || null;
    IcdVersion.find()
        .or([{ version: appVersion }])
        .countDocuments()
        .then((count) => {
            if (count < 1) {
                res.status(400).json({
                    status: 'error',
                    msg: "Invalid ICD Version",
                });
            } else {
                IcdCode.deleteOne({ _id: req.params.id, appVersion })
                    .then(() => res.json({
                        status: 'success',
                        msg: "Deleted Successfully",
                    }))
                    .catch((err) => 
                    res.status(422).json({
                        status: 'err',
                        msg: "Server Error",
                    }));
            }
        })
        .catch((err) => {
            res.status(422).json({
                status: 'err',
                msg: "Server Error 5",
            });
        });
});


module.exports = router;
