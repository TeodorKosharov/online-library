import React from "react";
import styles from "./DetailsStyles.module.css";
import {useParams} from "react-router-dom";
import {customQuestionAlert} from "../utils/customQuestionAlert";
import {customFetch} from "../utils/customFetch";
import {getUserData} from "../utils/genericUtils";


export const DetailsPage = () => {
    const [book, setBook] = React.useState('');
    const [comments, setComments] = React.useState([]);
    const {bookId} = useParams();
    const [userUsername, , token] = getUserData();

    React.useEffect(() => {
        customFetch('POST', {'book_id': Number(bookId)}, 'core', `details-book/${Number(bookId)}`, null)
            .then((response) => response.json())
            .then((data) => setBook(data));

        customFetch('POST', {'book_id': Number(bookId)}, 'core', `get-comments/${Number(bookId)}`, null)
            .then((response) => response.json())
            .then((data) => setComments(data));
    }, []);

    function displayCommentForm() {
        customQuestionAlert(
            'Type your comment',
            'text',
            'add-comment',
            token,
            {'commentator_username': userUsername, 'book_id': bookId},
            {icon: 'error', title: 'Oops...', text: 'Comment can not be empty!'})
            .then(() => {
                customFetch('POST', {'book_id': Number(bookId)}, 'core', `get-comments/${Number(bookId)}`, null)
                    .then((response) => response.json())
                    .then((data) => setComments(data));
            });
    }

    function deleteComment(commentId) {
        customQuestionAlert('Delete the comment?', null)
            .then((result) => {
                if (result.isConfirmed) {
                    customFetch('POST', {'comment_id': commentId}, 'core', `delete-comment/${Number(commentId)}`, token)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === 'Comment deleted successfully!') {
                                const updatedComments = comments.filter(com => com.id !== commentId);
                                setComments(updatedComments);
                            }
                        })
                }
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.bookBox}>
                <img className={styles.bookImg} src={book.imageUrl}/>
            </div>

            <div className={styles.infoBox}>
                <div className={styles.bookInfo}>
                    <p className={styles.heading}>Title</p>
                    <p className={styles.paragraph}>{book.title}</p>

                    <p className={styles.heading}>Description</p>
                    <p className={styles.paragraph}>{book.description}</p>

                    <p className={styles.heading}>Genre</p>
                    <p className={styles.paragraph}>{book.genre}</p>
                </div>

                <div className={styles.commentsBox}>
                    <p className={styles.commentsHeading}>Comments</p>
                    {token
                        ? <p className={`${styles.commentsHeading} ${styles.addCommentBtn}`}><i
                            className="fa-solid fa-circle-plus" title="Add comment" onClick={displayCommentForm}></i>
                        </p>
                        : null
                    }

                    <div className={styles.comments}>
                        {comments.length !== 0
                            ?
                            <div className={styles.commentsWrapper}>
                                {comments.map(comment =>
                                    <div className={styles.commentBox} key={comment.id}>
                                        <p className={styles.commentator}><i
                                            className={`fa-solid fa-user ${styles.icon}`}></i> {comment.commentator_username}
                                        </p>
                                        <p className={styles.comment}><i
                                            className={`fa-solid fa-comment ${styles.icon}`}></i> {comment.comment_description}
                                        </p>
                                        {comment.commentator_username === userUsername
                                            ? <button className={styles.delBtn} onClick={() => {
                                                deleteComment(comment.id)
                                            }}>Delete comment</button>
                                            : null
                                        }
                                    </div>
                                )}
                            </div>
                            : <p className={styles.noComments}>No comments yet!</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}