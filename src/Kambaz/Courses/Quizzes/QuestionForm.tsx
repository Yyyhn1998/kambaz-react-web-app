import { useState } from "react";
import { Question, QuestionType } from "./types";
import { Row, Col, Form, Button } from "react-bootstrap";


interface Props {
    question?: Question;
    onSave: (q: Question) => void;
    onCancel?: () => void;
}

const questionTypes: QuestionType[] = ["Multiple Choice", "True/False", "Fill in the Blank"];

export default function QuestionForm({ question, onSave, onCancel }: Props) {
    const [title, setTitle] = useState(question?.title || "");
    const [text, setText] = useState(question?.text || "");
    const [type, setType] = useState<QuestionType>(question?.type || "Multiple Choice");
    const [points, setPoints] = useState<number>(question?.points || 1);
    const [answer, setAnswer] = useState(question?.answer || "");
    const [choices, setChoices] = useState<string[]>(question?.choices || ["", ""]);
    const [correctAnswer, setCorrectAnswer] = useState<number>(question?.correctAnswer || 0);
    const [caseSensitive, setCaseSensitive] = useState<boolean>(question?.caseSensitive || false);

    const handleChoiceChange = (index: number, value: string) => {
        const updated = [...choices];
        updated[index] = value;
        setChoices(updated);
    };

    const handleAddChoice = () => {
        setChoices([...choices, ""]);
    };

    const handleRemoveChoice = (index: number) => {
        const updated = choices.filter((_, i) => i !== index);
        setChoices(updated);
        if (index === correctAnswer && choices.length > 0) {
            setCorrectAnswer(0);
        }
    };

    const handleSave = () => {
        const q: Question = {
            title,
            text,
            type,
            answer,
            points,
            choices: (type === "Multiple Choice" || type === "Fill in the Blank") ? choices : [],
            correctAnswer: type === "Multiple Choice" ? correctAnswer : undefined,
            caseSensitive: type === "Fill in the Blank" ? caseSensitive : undefined,
        };

        onSave(q);
    };




    return (
        <div className="border p-3 my-3">
            <h5>{question ? "Edit Question" : "New Question"}</h5>

            <Row className="mb-3 align-items-end">
                <Col md={5}>
                    <Form.Control
                        type="text"
                        placeholder="Title of the question"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col md={4} className="ps-2">
                    <Form.Select
                        value={type}
                        onChange={(e) => setType(e.target.value as QuestionType)}
                    >
                        {questionTypes.map((qt) => (
                            <option key={qt} value={qt}>
                                {qt}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3} className="d-flex align-items-center">
                    <span className="me-2"><b>pts:</b></span>
                    <Form.Control
                        type="number"
                        placeholder="Points"
                        value={points}
                        onChange={(e) => setPoints(parseInt(e.target.value))}
                        min={0}
                    />
                </Col>
            </Row>

            <div className="mb-4">
                <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Question:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder={type === "Fill in the Blank" ?
                        "Enter the question with [blank] to indicate where students should fill in" :
                        "Enter your question here"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {type === "Fill in the Blank" && (
                    <Form.Text className="text-muted">
                        Tip: Use [blank] in your text to indicate where the blank should appear.
                    </Form.Text>
                )}
            </div>

            {type === "Multiple Choice" && (
                <div className="mb-4">
                    <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Answers:</Form.Label>
                    {choices.map((choice, idx) => (
                        <Row key={idx} className="mb-2 align-items-center">
                            <Col md={1} className="text-center">
                                <Form.Check
                                    type="radio"
                                    name="correctAnswer"
                                    id={`choice-correct-${idx}`}
                                    checked={idx === correctAnswer}
                                    onChange={() => setCorrectAnswer(idx)}
                                />
                            </Col>
                            <Col md={2} className="text-end pe-0">
                                <Form.Label className="mb-0">Choice {idx + 1}:</Form.Label>
                            </Col>
                            <Col md={7}>
                                <Form.Control
                                    placeholder={`Enter option ${idx + 1}`}
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(idx, e.target.value)}
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveChoice(idx)}
                                    className="w-100"
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <div className="text-center mt-3 mb-3">
                        <Button
                            variant="secondary"
                            onClick={handleAddChoice}
                            className="px-4"
                        >
                            + Add Choice
                        </Button>
                    </div>
                </div>
            )}

            {type === "True/False" && (
                <div className="mb-4">
                    <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Correct Answer:</Form.Label>
                    <div className="d-flex justify-content-start gap-4 ms-2">
                        <Form.Check
                            type="radio"
                            id="true-answer"
                            label="True"
                            name="tf-correctAnswer"
                            checked={answer === "True"}
                            onChange={() => setAnswer("True")}
                            className="fw-bold"
                        />
                        <Form.Check
                            type="radio"
                            id="false-answer"
                            label="False"
                            name="tf-correctAnswer"
                            checked={answer === "False"}
                            onChange={() => setAnswer("False")}
                            className="fw-bold"
                        />
                    </div>
                </div>
            )}

            {/* {type === "Short Answer" && (
                <div className="mb-4">
                    <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Correct Answer:</Form.Label>
                    <Form.Control
                        className="mb-2"
                        placeholder="Enter the correct answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
            )} */}

            {type === "Fill in the Blank" && (
                <div className="mb-4">
                    <Form.Label className="fs-5 fw-bold ps-0 w-100 text-start">Possible Answers:</Form.Label>
                    {choices.map((choice, index) => (
                        <Row key={index} className="mb-2 align-items-center">
                            <Col md={9}>
                                <Form.Control
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                    placeholder={`Possible answer ${index + 1}`}
                                />
                            </Col>
                            <Col md={3}>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveChoice(index)}
                                    className="w-100"
                                    disabled={choices.length <= 1}
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <div className="text-center mt-3 mb-3">
                        <Button
                            variant="secondary"
                            onClick={handleAddChoice}
                            className="px-4"
                        >
                            + Add Another Answer
                        </Button>
                    </div>

                    <Form.Check
                        type="checkbox"
                        id="case-sensitive"
                        label="Case sensitive answers"
                        checked={caseSensitive}
                        onChange={(e) => setCaseSensitive(e.target.checked)}
                        className="mb-2"
                    />
                    <Form.Text className="text-muted">
                        If checked, student answers must match case exactly. If unchecked, "ANSWER" and "answer" will be treated the same.
                    </Form.Text>
                </div>
            )}

            <div className="d-flex justify-content-between mt-4">
                {onCancel && (
                    <Button variant="outline-secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button
                    variant="primary"
                    onClick={handleSave}
                    className={onCancel ? "" : "ms-auto"}
                >
                    Save Question
                </Button>
            </div>
        </div>
    );
}