import React, { useState } from 'react'

function SubscribeSection() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const subscribeNewsletter = async (e) => {
        e.preventDefault();

        try {
            // check for errors
            if (email.trim().length === 0) {
                setError("E-mail field is required");

                return false;
            }
            setError("");
            setSuccess("");
            setIsLoading(true);

            let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/newsletter.php", {
                method: "POST",
                body: JSON.stringify({
                    email: email
                }),
            });

            let resJson = await res.json();
            if (res.status === 200) {
                if (resJson.success) {
                    setSuccess("You have successfully subscribed to the newsletter!");
                    setEmail("");
                }
                else if (resJson.error) {
                    setError(resJson.errors);
                }
            } else {
                setError("Some error occured");
            }
            setIsLoading(false);
        } catch (err) {
            setError(err);
        }
    }
    return (
        <>
            <div className="container">
                <div className="footer_inbox">
                    <h5>Get Platform Updates Sent Directly To Your Inbox</h5>
                    <p>Become a Marquee VIP today</p>

                    <div className="row m-0 justify-content-center">
                        <div className="col-md-8 col-lg-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Enter your email address" aria-label="Recipient's username" aria-describedby="button-addon2" onBlur={(e) => setEmail(e.target.value)} />
                                <button onClick={(e) => subscribeNewsletter(e)} className="btn_blue" type="button" id="button-addon2">Subscribe</button>
                            </div>
                            {error && (
                                <div style={{ width: '100%',marginTop:'10px' }} className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: error }}></div>
                            )}
                            {success && (
                                <div style={{ width: '100%',marginTop:'10px' }} className="alert alert-success" role="alert" dangerouslySetInnerHTML={{ __html: success }}></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubscribeSection