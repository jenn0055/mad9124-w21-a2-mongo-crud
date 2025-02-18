const Course = require('../models/course')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const course = await Course.find()
    res.send({data: course})
  })

  router.post('/', async (req, res) => {
    let attributes = req.body
    delete attributes._id
  
    let newCourse = new Course(attributes)
    await newCourse.save()
  
    res.status(201).send({data: newCourse})
  })

  router.get('/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)
      if (!course) throw new Error('Resource not found')
      res.send({data: course})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })

  router.patch('/:id', async (req, res) => {
    try {
      const {_id, ...otherAttributes} = req.body
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        {_id: req.params.id, ...otherAttributes},
        {
          new: true,
          runValidators: true
        }
      )
      if (!course) throw new Error('Resource not found')
      res.send({data: course})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })

  router.put('/:id', async (req, res) => {
    try {
      const {_id, ...otherAttributes} = req.body
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        {_id: req.params.id, ...otherAttributes},
        {
          new: true,
          overwrite: true,
          runValidators: true
        }
      )
      if (!course) throw new Error('Resource not found')
      res.send({data: course})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const course = await Course.findByIdAndRemove(req.params.id)
      if (!course) throw new Error('Resource not found')
      res.send({data: course})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })

function sendResourceNotFound(req, res) {
    res.status(404).send({
      errors: [
        {
          status: 'Not Found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a course with id: ${req.params.id}`
        }
      ]
    })
  }