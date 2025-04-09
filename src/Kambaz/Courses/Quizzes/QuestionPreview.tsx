import { Question } from "./types";

export default function QuestionPreview({ question }: { question: Question }) {
    const renderQuestionText = (text: string) => {
        if (!text) return "";
        if (question.type === "Fill in the Blank") {
            return text.replace(/\[blank\]/g, "____________");
        }
        return text;
    };

    return (
        <div className="border border-dark p-0 mb-4">
            <div
                className="bg-light p-3 d-flex justify-content-between align-items-center border-bottom border-dark">
                <h5 className="mb-0">Question</h5>
                <div className="fw-bold">{question.points} pts</div>
            </div>


            <div className="p-3">
                {question.title && (
                    <h4 className="fw-bold mb-3">{question.title}</h4>
                )}

                <div className="mb-3 fs-5">
                    {renderQuestionText(question.text)}
                </div>

                <hr className="mx-3 my-3" />

                <div className="mt-4">
                    {question.type === "Multiple Choice" && question.choices && (
                        <div className="ms-2">
                            {question.choices.map((choice, idx) => (
                                <div key={idx}>
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`question-${question._id}`}
                                                id={`choice-${question._id}-${idx}`}
                                                disabled
                                                checked={idx === question.correctAnswer}
                                            />
                                            <label className="form-check-label ms-2 fs-5" htmlFor={`choice-${question._id}-${idx}`}>
                                                {choice}
                                            </label>
                                        </div>
                                    </div>

                                    {idx < question.choices.length - 1 && (
                                        <hr className="mx-4 my-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}


                    {question.type === "True/False" && (
                        <div className="ms-2">
                            <div className="d-flex align-items-center mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question._id}`}
                                        id={`true-${question._id}`}
                                        disabled
                                        checked={question.answer === "True"}
                                    />
                                    <label className="form-check-label ms-2 fs-5" htmlFor={`true-${question._id}`}>
                                        True
                                    </label>
                                </div>
                            </div>
                            <hr className="mx-4 my-2" />
                            <div className="d-flex align-items-center mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question._id}`}
                                        id={`false-${question._id}`}
                                        disabled
                                        checked={question.answer === "False"}
                                    />
                                    <label className="form-check-label ms-2 fs-5" htmlFor={`false-${question._id}`}>
                                        False
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}


                    {question.type === "Fill in the Blank" && (
                        <div className="ms-2">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control fs-5"
                                    placeholder="Student answer will appear here"
                                    disabled
                                />
                                <small className="form-text text-muted mt-1">
                                    Possible answers: {question.choices?.join(", ")}
                                </small>
                            </div>
                        </div>
                    )}


                    {/* {question.type === "Short Answer" && (
                        <div className="ms-2">
                            <div className="form-group">
                                <textarea
                                    className="form-control fs-5"
                                    rows={3}
                                    placeholder="Student answer will appear here"
                                    disabled
                                ></textarea>
                                <small className="form-text text-muted mt-1">
                                    Expected answer: {question.answer}
                                </small>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}