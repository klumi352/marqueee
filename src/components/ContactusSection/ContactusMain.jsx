import React, { useState } from 'react'
import Input from '../Form/Input'
import ReCAPTCHA from "react-google-recaptcha";
function ContactusMain() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recaptcha, setRecaptcha] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onChangeRecaptcha = (value) => {
        setRecaptcha(value);
      }
    
    const submitForm = async () => {
        try {
            // check for errors
            let error_messages = [];
            if (name.trim().length === 0) {
                error_messages.push("Name");
            }
            if (email.trim().length === 0) {
                error_messages.push("E-mail");
            }
            if (subject.trim().length === 0) {
                error_messages.push("Subject");
            }
            if (message.trim().length === 0) {
                error_messages.push("Message");
            }
            if (recaptcha.trim().length === 0) {
                error_messages.push("Clicking on the Recaptcha");
            }
            if (error_messages.length > 0) {
                let error_message = "The following fields are required";
                error_message += "<ul>";
                for (let i = 0; i < error_messages.length; i++) {
                    error_message += "<li>" + error_messages[i] + "</li>";
                }
                error_message += "</ul>";
                setError(error_message);

                return false;
            }
            setError("");
            setSuccess("");
            setIsLoading(true);

            let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/contact_form.php", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    // recaptcha: recaptcha
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                if (resJson.success) {
                    setSuccess("Your message was sent successfully!");
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                }
                else {
                    let error_message = "The following errors have occured";
                    error_message += "<ul>";
                    for (let i = 0; i < resJson.errors.length; i++) {
                        error_message += "<li>" + resJson.errors[i] + "</li>";
                    }
                    error_message += "</ul>";

                    setError(error_message);
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
            <section class="bg_f8 contact_section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="contect_content_box">
                                <h4>Leave a Message</h4>
                                <div class="row contact_form">
                                    <Input type={'text'} value={name} setValue={setName} placeholder={'Your Name'} colClass={'col-md-6'} />
                                    <Input type={'email'} value={email} setValue={setEmail} placeholder={'Your Email'} colClass={'col-md-6'} />
                                    <Input type={'text'} value={subject} setValue={setSubject} placeholder={'Subject'} colClass={'col-md-12'} />
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <textarea class="form-control" value={message} onChange={(e) => setMessage(e.target.value)} id="exampleFormControlTextarea1" rows="3" placeholder="Enter Your Message..."></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12" style={{margin:'10px 0px'}}>
                                        <div className="form-group text_box">
                                            <ReCAPTCHA
                                                sitekey={process.env.REACT_APP_RECAPTCHA}
                                                onChange={onChangeRecaptcha}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <div style={{ width: '100%' }} className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: error }}></div>
                                )}
                                {success && (
                                    <div style={{ width: '100%' }} className="alert alert-success" role="alert" dangerouslySetInnerHTML={{ __html: success }}></div>
                                )}
                                <button class="btn_banner" onClick={submitForm}>{isLoading ? 'Loading...' : 'Send'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactusMain