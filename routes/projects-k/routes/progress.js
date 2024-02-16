const express = require("express")
const router = express.Router()

router.get('/list-steps', async (req, res) => {
    try {
        const { pb } = req
        const steps = await pb.collection("projects_k_progress_step").getFullList()

        res.json({
            state: "success",
            data: steps
        })
    } catch (error) {
        res.status(500).send({
            state: "error",
            message: error.message
        })
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const { pb } = req
        let project = await pb.collection("projects_k_entry").getOne(req.params.id, {
            expand: "progress.steps"
        })

        project = project.expand.progress

        for (const steps of project.expand.steps) {
            for (const key in steps) {
                if (!["name", "icon", "id"].includes(key)) {
                    delete steps[key]
                }
            }
        }

        project.expand.steps = Object.fromEntries(
            project.expand.steps.map(step => [
                step.id,
                { name: step.name, icon: step.icon }
            ])
        )

        res.json({
            state: "success",
            data: project
        })
    } catch (error) {
        res.status(500).send({
            state: "error",
            message: error.message
        })
    }
})

router.post("/complete-step/:id", async (req, res) => {
    try {
        const { pb } = req
        const project = await pb.collection("projects_k_entry").getOne(req.params.id, {
            expand: "progress.steps"
        })
        const progressRecord = project.expand.progress

        await pb.collection("projects_k_progress").update(progressRecord.id, {
            "completed+": 1
        })

        res.json({
            state: "success"
        })
    } catch (error) {
        res.status(500).send({
            state: "error",
            message: error.message
        })
    }
})

router.post("/uncomplete-step/:id", async (req, res) => {
    try {
        const { pb } = req
        const project = await pb.collection("projects_k_entry").getOne(req.params.id, {
            expand: "progress.steps"
        })
        const progressRecord = project.expand.progress

        await pb.collection("projects_k_progress").update(progressRecord.id, {
            "completed-": 1
        })

        res.json({
            state: "success"
        })
    } catch (error) {
        res.status(500).send({
            state: "error",
            message: error.message
        })
    }
})

module.exports = router