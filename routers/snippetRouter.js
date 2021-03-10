const router = require('express').Router();
const Snippet = require('../models/snippetModel');

router.get("/", async (req,res) => {
    try {
        const snippets = await Snippet.find();
        res.json(snippets);
    } catch(err) {
        res.status(500).send();
    }
});

router.post("/", async (req,res) => {
    try{

        const {title, description, code} = req.body;
    
        // validation
    
        if(!description && !code) {
            return res.status(400).json({ errorMessage: " You need to enter description or some code."});
        }
    
        const newSnippet = new Snippet({
            title, description, code
        });
    
        const savedSnippet = await newSnippet.save();
    
        res.json(savedSnippet);

    } catch(err) {
        res.status(500).send();
    }
});


router.put("/:id", async (req,res) => {
    try {
        const {title, description, code} = req.body;
        const snippetId = req.params.id;

        // validation

    
        if(!description && !code) {
            return res.status(400).json({ errorMessage: " You need to enter description or some code."});
        }

        if( !snippetId ) {
            return res.status(400).json({ errorMessage: "Snippet ID invalid"});
        }

        const originalSnippet = await Snippet.findById(snippetId);

        if ( !originalSnippet ) {
            return res.status(400).json({ errorMessage: "No snippet ID was found"});
        }

        originalSnippet.title = title;
        originalSnippet.description = description;
        originalSnippet.code = code;

        const savedSnippet = await originalSnippet.save();

        res.json(savedSnippet);

    } catch (err) {
        res.status(500).send();
    }
});


router.delete("/:id", async (req,res) => {
    try {
        const snippetId = req.params.id;

        // validation

        if( !snippetId ) {
            return res.status(400).json({ errorMessage: "Snippet ID invalid"});
        }

        const existingSnippet = await Snippet.findById(snippetId);

        if ( !existingSnippet ) {
            return res.status(400).json({ errorMessage: "No snippet ID was found"});
        }

        await existingSnippet.delete();

        res.json(existingSnippet);

    } catch (err) {
        res.status(500).send();
    }
});


module.exports = router;