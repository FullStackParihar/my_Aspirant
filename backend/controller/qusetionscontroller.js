const mongoose = require('mongoose');
const Question = require('../models/questionsmodel');
const Test = require('../models/testmodel');
 

// questions, option_a,option_b,option_c,option_d
// correct_ans, explaination
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.addQuestion = async (req, res) => {
    try {
        const { questions, option_a, option_b, option_c, option_d, correct_ans, explaination } = req.body;
        console.log("question body", req.body);

        const question = new Question({
            questions,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_ans,
            explaination
        });

        await question.save();
        res.status(201).json({ message: 'Question created successfully', question });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// exports.updateQuestion = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { questions, option_a, option_b, option_c, option_d, correct_ans, explaination } = req.body;

//         const question = await Question.findByIdAndUpdate(id, {
//             questions,
//             option_a,
//             option_b,
//             option_c,
//             option_d,
//             correct_ans,
//             explaination
//         }, { new: true });

//         if (!question) {
//             return res.status(404).json({ message: 'Question not found' });
//         }

//         res.status(200).json({ message: 'Question updated successfully', question });
//     } catch (error) {
//         console.error('Error updating question:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// when i delete a question, also delete it from the test collection and update the tests that contain this question
// the api url is /api/questions/delete/:id
// exports.deleteQuestion = async (questionId) => {
//     try {
//         const tests = await Test.find({ questions: questionId });
//         for (const test of tests) {
//             test.questions = test.questions.filter(q => q.toString() !== questionId.toString());
//             await test.save();
//         }
//     } catch (error) {
//         console.error('Error deleting question from tests:', error);
//         throw new Error('Failed to delete question from tests');
//     }
// }; 

exports.deleteQuestion = async (req, res) => {
    const questionId = req.params.id;

    try {
         
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({ error: 'Invalid question ID' });
        }

   
        const tests = await Test.find({ questions: questionId });
 
        for (const test of tests) {
            test.questions = test.questions.filter(
                q => q.toString() !== questionId
            );
            await test.save();
        }

      
        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            message: `Question deleted successfully and removed from tests`,
        });

    } catch (error) {
        console.error('Error deleting question from tests:', error);
        return res.status(500).json({ error: 'Failed to delete question from tests' });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { questions, option_a, option_b, option_c, option_d, correct_ans, explaination } = req.body;

        const question = await Question.findByIdAndUpdate(id, {
            questions,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_ans,
            explaination
        }, { new: true });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question updated successfully', question });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




// exports.deleteQuestion = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const question = await Question.findByIdAndDelete(id);
//         if (!question) {
//             return res.status(404).json({ message: 'Question not found' });
//         }

//         res.status(200).json({ message: 'Question deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting question:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
 