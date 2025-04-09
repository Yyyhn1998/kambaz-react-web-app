import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, Tab, Nav } from "react-bootstrap";
import { createQuiz, fetchQuizById, updateQuiz } from "./client";
import { QuizType, Question } from "./types";
import QuestionForm from "./QuestionForm";
import QuestionPreview from "./QuestionPreview";

export default function QuizEditorView() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();

    // 设置活动标签
    const [activeTab, setActiveTab] = useState("details");
    const [quizData, setQuizData] = useState<QuizType>({

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
    });

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showQuestionForm, setShowQuestionForm] = useState(false);  // 控制显示问题表单

    useEffect(() => {
        const load = async () => {
            if (qid) {
                const fetched = await fetchQuizById(qid);
                setQuizData(fetched);
            }
        };
        load();
    }, [qid]);

    const handleQuestionSave = (q: Question) => {
        const updated = [...quizData.questions];
        if (editingIndex !== null) {
            updated[editingIndex] = q;
        } else {
            updated.push(q);
        }
        setQuizData({ ...quizData, questions: updated });
        setEditingIndex(null);
        setShowQuestionForm(false);
    };

    const handleDelete = (index: number) => {
        const updated = quizData.questions.filter((_, i) => i !== index);
        setQuizData({ ...quizData, questions: updated });
    };

    const handleSaveQuiz = async () => {
        const finalQuiz = {
            ...quizData,
            points: quizData.questions.reduce((sum, q) => sum + q.points, 0),
        };
        if (qid) {
            await updateQuiz(qid, finalQuiz);
        } else {
            await createQuiz(cid!, finalQuiz);
        }
        navigate(`/courses/${cid}/quizzes`);
    };

    return (
        <div className="container py-4">
            <h2>{qid ? "Edit Quiz" : "Create New Quiz"}</h2>

            <Tab.Container
                activeKey={activeTab}
                onSelect={(key) => key && setActiveTab(key)}
            >
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link eventKey="details">Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="questions">Questions</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="details">
                        <Row className="mb-3">
                            <Col>
                                <input
                                    className="form-control mb-2"
                                    placeholder="Quiz Title"
                                    value={quizData.title}
                                    onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <textarea
                                    className="form-control mb-3"
                                    placeholder="Quiz Description"
                                    value={quizData.description}
                                    onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="questions">
                        <h4 className="mt-4">Questions</h4>
                        {quizData.questions.length === 0 ? (
                            <div>
                                <p>No questions available. Click Add to add questions.</p>
                                <Button
                                    variant="primary"
                                    onClick={() => setShowQuestionForm(true)}
                                >
                                    Add Question
                                </Button>
                            </div>
                        ) : (
                            <div>
                                {quizData.questions.map((q, index) => (
                                    <div key={q._id} className="border p-3 my-2">
                                        <QuestionPreview question={q} />
                                        <div className="mt-2 d-flex gap-2">
                                            <button className="btn btn-warning" onClick={() => setEditingIndex(index)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showQuestionForm && (
                            <QuestionForm
                                question={editingIndex !== null ? quizData.questions[editingIndex] : undefined}
                                onSave={handleQuestionSave}
                                onCancel={() => setShowQuestionForm(false)}
                            />
                        )}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>

            <div className="mt-4">
                <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
                    Cancel
                </Button>
                <Button variant="success" onClick={handleSaveQuiz}>
                    Save Quiz
                </Button>
            </div>
        </div>
    );
}
