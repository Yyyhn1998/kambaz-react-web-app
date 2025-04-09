import { useParams, useNavigate } from "react-router-dom";
import { Button, Table, Row, Col, Badge } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";
import { QuizType } from "./types";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector(
        // eslint-disable-next-line
        (state: { accountReducer: { currentUser: any } }) =>
            state.accountReducer.currentUser
    );

    const [quiz, setQuiz] = useState<QuizType | null>(null);


    const totalPoints = useMemo(() => {
        if (!quiz || !quiz.questions) return 0;
        return quiz.questions.reduce((sum, q) => sum + q.points, 0);
    }, [quiz]);

    useEffect(() => {
        const loadQuiz = async () => {
            if (qid) {
                try {
                    const data = await client.fetchQuizById(qid);

                    const updatedData = {
                        ...data,
                        points: data.questions.reduce((sum: number, q: { points: number }) => sum + q.points, 0)
                    };


                    if (data.points !== updatedData.points) {
                        await client.updateQuiz(qid, updatedData);
                    }

                    setQuiz(updatedData);
                } catch (e) {
                    console.error("Failed to load quiz", e);
                }
            }
        };
        loadQuiz();
    }, [qid]);

    if (!quiz) return <div>Loading...</div>;

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

    const renderYesNo = (val?: boolean) => (val ? "Yes" : "No");

    return (
        <div className="m-4">
            <div className="text-center mb-3">
                <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes`)}
                >
                    Back
                </Button>
                <Button
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes/${qid}/preview`)}
                >
                    Preview
                </Button>
                {currentUser?.role === "FACULTY" && (
                    <Button
                        variant="danger"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes/${qid}/edit`)}
                    >
                        Edit
                    </Button>
                )}
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">{quiz.title}</h3>
                <Badge bg="primary" className="fs-5 px-3 py-2">
                    Total Points: {totalPoints}
                </Badge>
            </div>

            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Quiz Type</strong></Col>
                <Col>{quiz.quizType || "Graded Quiz"}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Points</strong></Col>
                <Col>{totalPoints}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Assignment Group</strong></Col>
                <Col>{quiz.assignmentGroup || "Quizzes"}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Shuffle Answers</strong></Col>
                <Col>{renderYesNo(quiz.shuffleAnswers)}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Time Limit</strong></Col>
                <Col>{quiz.timeLimit || 0} Minutes</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Multiple Attempts</strong></Col>
                <Col>{renderYesNo(quiz.multipleAttempts)}</Col>
            </Row>
            {quiz.multipleAttempts && (
                <Row className="mb-3 w-75">
                    <Col xs={5}><strong>How Many Attempts</strong></Col>
                    <Col>{quiz.attempts || 1}</Col>
                </Row>
            )}
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Show Correct Answers</strong></Col>
                <Col>{"After Due Date"}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Access Code</strong></Col>
                <Col>{"(none)"}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>One Question at a Time</strong></Col>
                <Col>{renderYesNo(quiz.oneQuestionAtATime)}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Webcam Required</strong></Col>
                <Col>{renderYesNo(quiz.webcamRequired)}</Col>
            </Row>
            <Row className="mb-3 w-75">
                <Col xs={5}><strong>Lock Questions After Answering</strong></Col>
                <Col>{renderYesNo(quiz.lockQuestionsAfterAnswering)}</Col>
            </Row>

            {/* Displaying the quiz questions */}
            <h4 className="mt-4">Questions</h4>
            {quiz.questions.length === 0 ? (
                <p>No questions available. Click Edit to add questions.</p>
            ) : (
                <Table bordered className="w-75 mt-4 text-center align-middle">
                    <thead>
                    <tr className="bg-light">
                        <th>Question</th>
                        <th>Points</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quiz.questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question.text}</td>
                            <td>{question.points}</td>
                            <td>{question.type}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            <Table bordered className="w-75 mt-4 text-center align-middle">
                <thead>
                <tr className="bg-light">
                    <th>Due</th>
                    <th>For</th>
                    <th>Available From</th>
                    <th>Until</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{quiz.dueDate ? formatDate(quiz.dueDate) : "N/A"}</td>
                    <td>Everyone</td>
                    <td>{quiz.availableDate ? formatDate(quiz.availableDate) : "N/A"}</td>
                    <td>{quiz.untilDate ? formatDate(quiz.untilDate) : "N/A"}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}