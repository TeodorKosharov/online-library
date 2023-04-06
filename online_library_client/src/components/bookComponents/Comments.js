import styles from "../../pages/pagesStyles/DetailsStyles.module.css";
import React from "react";
import {customQuestionAlert} from "../../utils/customQuestionAlert";
import {customFetch} from "../../utils/customFetch";

export const Comments = (props) => {
    const [comments, setComments] = React.useState([]);
    const {userUsername, token, bookId} = props.data;

    React.useEffect(() => {
        customFetch('GET', undefined, 'core', `get-comments/${Number(bookId)}`, null)
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
                customFetch('GET', undefined, 'core', `get-comments/${Number(bookId)}`, null)
                    .then((response) => response.json())
                    .then((data) => setComments(data));
            });
    }

    function deleteComment(commentId) {
        customQuestionAlert('Delete the comment?', null)
            .then((result) => {
                if (result.isConfirmed) {
                    customFetch('DELETE', undefined, 'core', `delete-comment/${Number(commentId)}`, token)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === 'Comment deleted successfully!') {
                                const updatedComments = comments.filter(com => com.id !== commentId);
                                setComments(updatedComments);
                            }
                        });
                }
            });
    }

    return (
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
    );
}