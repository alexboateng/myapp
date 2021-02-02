const express = require('express');

const router = express.Router();
const { IcdVersion } = require('../models/icdVersion');


//// update driver socket id
router.post('/', (req, res) => {
    let version= null;

    if(req.body) {
        version= req.body.version || null;
    }
    
    if (!parseInt(version, 10)) {
        //res.sendStatus(400);
        res.status(400).json({
            status: 'error',
            msg: "ICD Version is required: Number",
        });
    } else {
        dataToAdd = {
            version
        }
        const icdVersion = new IcdVersion(dataToAdd);


        IcdVersion.find()
            .or([{ version }])
            .countDocuments()
            .then((count) => {
                if (count > 0) {
                    res.status(400).json({
                        status: 'error',
                        msg: "ICD version already added",
                    });
                } else {
                    icdVersion.save()
                        .then((savedData) => {
                            res.json({
                                status: 'success',
                                msg: savedData,
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
                    msg: "Server Error",
                });
            });
    }
});


router.get('/', async (req, res) => {
    try {
        const icdVersion = await IcdVersion.find();
  
        res.json({
            status: 'success',
            msg: icdVersion
        });
      } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: error,
        });
    }
});

router.delete('/:id', (req, res) => {
    IcdVersion.deleteOne({ idver: req.params.id })
        .then(() => res.json({
            status: 'success',
            msg: "Deleted Successfully",
        }))
        .catch((err) => 
        res.status(422).json({
            status: 'err',
            msg: "Server Error",
        }));
});


module.exports = router;
