import { useEffect, useState } from "react";
import { Button, ListGroup, Form, InputGroup, Modal, Dropdown } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { QuizType, QuizAttempt } from "./types";
import * as client from "./client";
import { useSelector } from "react-redux";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaRocket, FaCheckCircle, FaCircle, FaTrash, FaPencilAlt } from "react-icons/fa";

function QuizIcon({ className }: { className?: string }) {
    return (
        <FaRocket className={`text-success fs-4 ${className || ""}`} />
    );
}

function QuizStatusIcon({ published }: { published?: boolean }) {
    return (
        <span className="me-4 position-relative">
            <FaCheckCircle
                style={{ top: "2px" }}
                className={`${published ? "text-success" : "text-success opacity-50"} me-1 position-absolute fs-5`}
            />
            <FaCircle className="text-white me-1 fs-6" />
        </span>
    );
}

export default function QuizList() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<QuizType[]>([]);
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
// eslint-disable-next-line
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    useEffect(() => {
        const load = async () => {
            if (cid) {
                const data = await client.fetchQuizzesForCourse(cid);

                // 处理每个quiz，确保points正确计算
                const updatedQuizzes = data.map((quiz: QuizType) => {
                    const calculatedPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
                    return {
                        ...quiz,
                        points: calculatedPoints
                    };
                });

                setQuizzes(updatedQuizzes);
            }
        };
        load();
    }, [cid]);

    useEffect(() => {
        const loadAttempts = async () => {
            if (currentUser?._id && currentUser.role === "STUDENT" && quizzes.length > 0) {
                try {
                    const allAttempts = await Promise.all(
                        quizzes.map(quiz => {
                            if (!quiz._id) return Promise.resolve([]);
                            return client.fetchStudentQuizAttempts(quiz._id, currentUser._id).catch(() => []);
                        })
                    );
                    setAttempts(allAttempts.flat());
                } catch (error) {
                    console.error("Failed to load attempts", error);
                }
            }
        };

        loadAttempts();
    }, [quizzes, currentUser]);

    const formatDate = (iso: string | undefined) => {
        if (!iso) return "-";
        return new Date(iso).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };


    const getQuizStatus = (quiz: QuizType) => {
        const now = new Date();

        if (!quiz.published) {
            return "Unpublished";
        }

        if (quiz.availableDate && new Date(quiz.availableDate) > now) {
            return `Not available until ${formatDate(quiz.availableDate)}`;
        }

        if (quiz.untilDate && new Date(quiz.untilDate) < now) {
            return "Closed";
        }

        return `Available from ${formatDate(quiz.availableDate)}`;
    };

    const getStudentScore = (quizId: string) => {
        if (!currentUser?._id) return "0%";


        const quizAttempts = attempts.filter(attempt => attempt.quizId === quizId);
        if (quizAttempts.length === 0) return "0%";

        const latestAttempt = quizAttempts.reduce((latest, attempt) =>
            new Date(attempt.submittedAt) > new Date(latest.submittedAt) ? attempt : latest
        );

        const quiz = quizzes.find(q => q._id === quizId);
        if (!quiz) return "0%";

        const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
        const percentage = (latestAttempt.score / totalPoints) * 100;

        return `${percentage.toFixed(0)}%`;
    };

    const handleDeleteClick = (quiz: QuizType) => {
        setSelectedQuiz(quiz);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedQuiz && selectedQuiz._id) {
            try {
                await client.deleteQuiz(selectedQuiz._id);
                const data = await client.fetchQuizzesForCourse(cid!);
                setQuizzes(data);
            } catch (error) {
                console.error("Failed to delete quiz:", error);
            }
        }
        setShowDeleteModal(false);
        setSelectedQuiz(null);
    };

    const handlePublishToggle = async (quiz: QuizType) => {
        if (!quiz._id) return;

        const updatedQuiz = {
            ...quiz,
            published: !quiz.published
        };

        try {
            await client.updateQuiz(quiz._id, updatedQuiz);
            const data = await client.fetchQuizzesForCourse(cid!);

            const updatedQuizzes = data.map((q: QuizType) => {
                const calculatedPoints = q.questions.reduce((sum, qItem) => sum + qItem.points, 0);
                return {
                    ...q,
                    points: calculatedPoints
                };
            });

            setQuizzes(updatedQuizzes);
        } catch (error) {
            console.error("Failed to update quiz:", error);
        }
    };

    const filteredQuizzes = searchTerm
        ? quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : quizzes;

    const greenBorderStyle = {
        borderLeft: '4px solid #28a745'
    };

    return (
        <div className="m-4">
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <InputGroup style={{ width: "300px" }}>
                    <InputGroup.Text className="bg-white border-end-0">
                        <BsSearch className="text-secondary" />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search for Quizzes"
                        className="border-start-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                {currentUser?.role === "FACULTY" && (
                    <Button
                        variant="danger"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes/new/edit`)}
                    >
                        <FaPlus className="me-2 mb-1" />
                        Quiz
                    </Button>
                )}
            </div>

            <ListGroup className="rounded-0 border">
                <ListGroup.Item className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                    <div className="d-flex align-items-center">
                        <span className="fs-5 fw-bold">ALL QUIZZES</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="text-secondary me-3">{quizzes.length} Quizzes</span>
                    </div>
                </ListGroup.Item>

                <ListGroup className="rounded-0">
                    {filteredQuizzes.map((quiz) => (
                        <ListGroup.Item
                            key={quiz._id}
                            className="border-bottom p-0"
                            style={greenBorderStyle}
                        >
                            <div className="d-flex align-items-center w-100">

                                <div className="d-flex align-items-center justify-content-center"
                                     style={{ width: "60px", height: "100%", padding: "20px 0" }}>
                                    <QuizIcon />
                                </div>

                                <div className="flex-grow-1 text-start py-3">
                                    <Link
                                        to={currentUser?.role === "FACULTY"
                                            ? `/Kambaz/Courses/${cid}/quizzes/${quiz._id}`
                                            : `/Kambaz/Courses/${cid}/quizzes/${quiz._id}/confirm`}
                                        className="fs-5 fw-bold text-decoration-none text-dark"
                                    >
                                        {quiz.title}
                                    </Link>
                                    <div className="text-secondary small">
                                        <span className={quiz.published ? "text-success" : "text-warning"}>
                                            {getQuizStatus(quiz)}
                                        </span> |
                                        <span className="fw-bold"> Due:</span> {formatDate(quiz.dueDate)} |
                                        <span> {quiz.points || 0} pts</span> |
                                        <span> {quiz.questions.length} questions</span>
                                        {currentUser?.role === "STUDENT" && (
                                            <span> | Score: {getStudentScore(quiz._id|| '')}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center pe-3">
                                    <QuizStatusIcon published={quiz.published} />

                                    {currentUser?.role === "FACULTY" && (
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="cursor-pointer" id={`dropdown-${quiz._id}`}>
                                                <BsThreeDotsVertical className="fs-4" />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes/${quiz._id}/edit`)}>
                                                    <FaPencilAlt className="me-2" /> Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDeleteClick(quiz)}>
                                                    <FaTrash className="me-2" /> Delete
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handlePublishToggle(quiz)}>
                                                    {quiz.published ? (
                                                        <>Unpublish</>
                                                    ) : (
                                                        <>Publish</>
                                                    )}
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}

                                    {currentUser?.role !== "FACULTY" && (
                                        <Button
                                            variant="success"
                                            onClick={() => navigate(`/Kambaz/Courses/${cid}/quizzes/${quiz._id}/confirm`)}
                                            className="ms-2"
                                        >
                                            Start
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ListGroup>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}