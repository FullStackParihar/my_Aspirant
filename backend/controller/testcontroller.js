const mondgoose = require('mongoose');
const Test = require('../models/testmodel');

//  title, questions,duration, marks, positive mark
// negative mark, package id, free or paid,
// descriptions

exports.getalltests = async (req, res) => {
    try {
        const tests = await Test.find().populate('packageId', 'title price').populate('questions', 'questions option_a option_b option_c option_d correct_ans explaination');
        console.log("tests", tests)
        res.status(200).json(tests);
    } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// exports.addtest = async (req, res) => {
//     try {
//         const { title, questions, duration, marks, positiveMark, negativeMark, packageId, isFree, description } = req.body;
//         console.log("test body", req.body)

//         const test = new Test({
//             title,
//             questions,
//             duration,
//             marks,
//             positiveMark,
//             negativeMark,
//             packageId,
//             isFree,
//             description
//         });

//         await test.save();
//         res.status(201).json({ message: 'Test created successfully', test });
//     } catch (error) {
//         console.error('Error creating test:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }

exports.addtest = async (req, res) => {
    try {
        let { title, questions, duration, marks, positiveMark, negativeMark, packageId, isFree, description } = req.body;
        console.log("test body", req.body);

        // Parse `questions` if it's a string (coming from form-data or urlencoded)
        if (typeof questions === 'string') {
            try {
                questions = JSON.parse(questions); // if it’s sent as a JSON string
            } catch (err) {
                // fallback: split on commas (in case it’s just a CSV-style string)
                questions = questions.replace(/[\[\]\s"]/g, '').split(',');
            }
        }

        const test = new Test({
            title,
            questions,
            duration,
            marks,
            positiveMark,
            negativeMark,
            packageId,
            isFree,
            description
        });

        await test.save();
        res.status(201).json({ message: 'Test created successfully', test });
    } catch (error) {
        console.error('Error creating test:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updatetest = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, questions, duration, marks, positiveMark, negativeMark, packageId, isFree, description } = req.body;

        const test = await Test.findByIdAndUpdate(id, {
            title,
            questions,
            duration,
            marks,
            positiveMark,
            negativeMark,
            packageId,
            isFree,
            description
        }, { new: true });

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
console.log("test updated", test)
        res.status(200).json({ message: 'Test updated successfully', test });
    } catch (error) {
        console.error('Error updating test:', error);
        res.status(500).json({ message: 'Server error' });
    }
}