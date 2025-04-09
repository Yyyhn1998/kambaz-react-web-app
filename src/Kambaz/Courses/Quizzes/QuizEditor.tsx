import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Tab, Nav, Modal, Badge } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";
import * as client from "./client";
import { QuizType, Question } from "./types";
import QuestionForm from "./QuestionForm";
import QuestionPreview from "./QuestionPreview";

const defaultQuiz: QuizType = {
    course: "",
    title: "",
    questions: [],
    description: "",
    dueDate: "",
    timeLimit: 20,
    assignmentGroup: "Quizzes",
    quizType: "Graded Quiz",
    attempts: 1,
    multipleAttempts: false,
    shuffleAnswers: true,
    availableDate: "",
    untilDate: "",
    published: false,
    points: 0,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    showCorrectAnswers: false,
};

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<QuizType>({ ...defaultQuiz, course: cid || "" });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
    const [showPublishConfirm, setShowPublishConfirm] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState("details");


    const totalPoints = useMemo(() => {
        return quiz.questions.reduce((sum, q) => sum + q.points, 0);
    }, [quiz.questions]);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid && qid !== "new") {
                try {
                    const data = await client.fetchQuizById(qid);
                    setQuiz(data);
                } catch (error) {
                    console.error("Failed to fetch quiz:", error);
                }
            }
        };
        fetchQuiz();
    }, [qid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setQuiz((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const quizWithPoints = {
            ...quiz,
            points: totalPoints
        };

        if (qid === "new") {
            await client.createQuiz(cid!, quizWithPoints);
        } else {
            await client.updateQuiz(qid!, quizWithPoints);
        }
        setShowSaveSuccess(true);
    };

    const handlePublishQuiz = () => {
        setShowPublishConfirm(true);
    };

    const confirmPublish = async () => {
        const finalQuiz = {
            ...quiz,
            published: true,
            points: totalPoints
        };
        if (qid === "new") {
            await client.createQuiz(cid!, finalQuiz);
        } else {
            await client.updateQuiz(qid!, finalQuiz);
        }
        setShowPublishConfirm(false);
        navigate(`/Kambaz/Courses/${cid}/quizzes`);
    };

    const cancelPublish = () => {
        setShowPublishConfirm(false);
    };

    const handleQuestionSave = (q: Question) => {
        const updated = [...quiz.questions];
        if (editingIndex !== null) {
            updated[editingIndex] = q;
        } else {
            updated.push(q);
        }
        setQuiz({ ...quiz, questions: updated });
        setEditingIndex(null);
        setShowQuestionForm(false);
    };

    const handleDelete = (index: number) => {
        const updated = quiz.questions.filter((_, i) => i !== index);
        setQuiz({ ...quiz, questions: updated });
    };

    return (
        <div className="m-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{qid === "new" ? "Create Quiz" : "Edit Quiz"}</h3>
                <Badge bg="primary" className="fs-5 px-3 py-2">
                    Total Points: {totalPoints}
                </Badge>
            </div>

            <Tab.Container id="quiz-editor-tabs" activeKey={activeTab} onSelect={(tabKey) => setActiveTab(tabKey as string)}>
                <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="details">Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="questions">Questions</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="details">
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        name="title"
                                        value={quiz.title}
                                        onChange={handleChange}
                                        placeholder="Quiz Title"
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        name="description"
                                        as="textarea"
                                        rows={3}
                                        value={quiz.description}
                                        onChange={handleChange}
                                        placeholder="Quiz Description"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Quiz Type</Form.Label>
                                        <Form.Select
                                            name="quizType"
                                            value={quiz.quizType}
                                            onChange={handleChange}
                                        >
                                            <option>Graded Quiz</option>
                                            <option>Practice Quiz</option>
                                            <option>Graded Survey</option>
                                            <option>Ungraded Survey</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Assignment Group</Form.Label>
                                        <Form.Select
                                            name="assignmentGroup"
                                            value={quiz.assignmentGroup}
                                            onChange={handleChange}
                                        >
                                            <option>Quizzes</option>
                                            <option>Exams</option>
                                            <option>Assignments</option>
                                            <option>Project</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Check
                                        type="checkbox"
                                        label="Shuffle Answers"
                                        name="shuffleAnswers"
                                        checked={quiz.shuffleAnswers}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Multiple Attempts"
                                        name="multipleAttempts"
                                        checked={quiz.multipleAttempts}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                    {quiz.multipleAttempts && (
                                        <Form.Group className="mt-2">
                                            <Form.Label>Attempts</Form.Label>
                                            <Form.Control
                                                name="attempts"
                                                type="number"
                                                value={quiz.attempts}
                                                onChange={handleChange}
                                                min={1}
                                            />
                                        </Form.Group>
                                    )}
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Correct Answers"
                                        name="showCorrectAnswers"
                                        checked={quiz.showCorrectAnswers}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                    <Form.Text className="text-muted mb-3">
                                        If checked, students will see correct answers after submitting the quiz.
                                    </Form.Text>

                                    <Form.Check
                                        type="checkbox"
                                        label="One Question at a Time"
                                        name="oneQuestionAtATime"
                                        checked={quiz.oneQuestionAtATime}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                    <Form.Text className="text-muted mb-3">
                                        If checked, students will see only one question at a time.
                                    </Form.Text>

                                    {quiz.oneQuestionAtATime && (
                                        <Form.Check
                                            type="checkbox"
                                            label="Lock Questions After Answering"
                                            name="lockQuestionsAfterAnswering"
                                            checked={quiz.lockQuestionsAfterAnswering}
                                            onChange={handleChange}
                                            className="mt-2 ms-4"
                                        />
                                    )}
                                    {quiz.oneQuestionAtATime && quiz.lockQuestionsAfterAnswering && (
                                        <Form.Text className="text-muted mb-3 ms-4">
                                            If checked, students cannot return to questions once answered.
                                        </Form.Text>
                                    )}

                                    <Form.Check
                                        type="checkbox"
                                        label="Webcam Required"
                                        name="webcamRequired"
                                        checked={quiz.webcamRequired}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Time Limit (minutes)</Form.Label>
                                        <Form.Control
                                            name="timeLimit"
                                            type="number"
                                            value={quiz.timeLimit}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        name="dueDate"
                                        type="datetime-local"
                                        value={quiz.dueDate}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Available From</Form.Label>
                                    <Form.Control
                                        name="availableDate"
                                        type="datetime-local"
                                        value={quiz.availableDate}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Until</Form.Label>
                                    <Form.Control
                                        name="untilDate"
                                        type="datetime-local"
                                        value={quiz.untilDate}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <div className="text-center mt-3">
                                <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="me-2">
                                    Save
                                </Button>
                                <Button variant="danger" onClick={handlePublishQuiz}>
                                    Save & Publish
                                </Button>
                            </div>
                        </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="questions">
                        <Button variant="secondary" onClick={() => setShowQuestionForm(true)} className="my-2">
                            + New Question
                        </Button>

                        {showQuestionForm && (
                            <QuestionForm
                                question={editingIndex !== null ? quiz.questions[editingIndex] : undefined}
                                onSave={handleQuestionSave}
                                onCancel={() => setShowQuestionForm(false)}
                            />
                        )}

                        {quiz.questions.map((q, index) => (
                            <div key={q._id || index} className="border p-3 my-2">
                                <QuestionPreview question={q} />
                                <div className="mt-2 d-flex gap-2">
                                    <button className="btn btn-warning" onClick={() => {
                                        setEditingIndex(index);
                                        setShowQuestionForm(true);
                                    }}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="text-center mt-3">
                            <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
                                Back
                            </Button>
                            <Button variant="primary" onClick={handleSubmit} className="me-2">
                                Save
                            </Button>
                            <Button variant="danger" onClick={handlePublishQuiz}>
                                Save & Publish
                            </Button>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>

            <Modal show={showSaveSuccess} onHide={() => setShowSaveSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your changes have been successfully saved.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes`)}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPublishConfirm} onHide={cancelPublish}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Publish</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save and publish the quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelPublish}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmPublish}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}