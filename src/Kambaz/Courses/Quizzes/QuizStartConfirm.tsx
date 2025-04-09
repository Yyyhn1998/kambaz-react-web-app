import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizById } from "./client";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { QuizType } from "./types";

export default function QuizStartConfirm() {
    const { qid, cid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<QuizType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { currentUser } = useSelector(
        // eslint-disable-next-line
        (state: { accountReducer: { currentUser: any } }) =>
            state.accountReducer
    );

    useEffect(() => {
        const loadQuiz = async () => {
            if (!qid) {
                setError("Quiz ID is missing");
                setLoading(false);
                return;
            }

            try {
                if (currentUser?.role !== "STUDENT") {
                    setError("Only students can take quizzes");
                    setLoading(false);
                    return;
                }

                const data = await fetchQuizById(qid);
                setQuiz(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load quiz:", error);
                setError("Failed to load quiz");
                setLoading(false);
            }
        };
        loadQuiz();
    }, [qid, currentUser]);

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
    if (!quiz) return <div className="text-center p-5">Quiz not found</div>;

    const startQuiz = () => {
        if (cid && qid) {
            navigate(`/Kambaz/Courses/${cid}/quizzes/${qid}/take`);
        }
    };

    const cancelQuiz = () => {
        if (cid) {
            navigate(`/Kambaz/Courses/${cid}/quizzes`);
        }
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h4">{quiz.title}</Card.Header>
                <Card.Body>
                    <Card.Title>Are you ready to start this quiz?</Card.Title>

                    <div className="my-4">
                        <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
                        {quiz.multipleAttempts && (
                            <p><strong>Attempts Allowed:</strong> {quiz.attempts || 1}</p>
                        )}
                        {quiz.description && (
                            <Alert variant="info">
                                <strong>Instructions:</strong><br/>
                                {quiz.description}
                            </Alert>
                        )}
                        <Alert variant="warning">
                            Once you start, the timer will begin and cannot be paused.
                        </Alert>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={cancelQuiz}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={startQuiz}>
                            Start Quiz
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}