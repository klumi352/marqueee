import React from 'react'
import Iframe from 'react-iframe'
function VideoMain() {
    return (
        <>
            <section className="section_three">
                <div className="container">
                    <h4 className="index_title">A Digital Billboard, Right at Your Fingertips</h4>
                    <p className="index_subtitle">The online economy has evolved – is your business keeping pace with the <br />
                        changes?
                        Advertise directly to your target market with secure, reliable MM NFTs.</p>

                    <div className="tube_video">
                        <Iframe url="https://www.youtube.com/embed/9xwazD5SyVg"
                            width="740px"
                            height="415px"
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowfullscreen={true}
                        />
                        {/* <iframe width="740" height="415" src="https://www.youtube.com/embed/9xwazD5SyVg"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe> */}
                    </div>
                </div>
            </section>

        </>
    )
}

export default VideoMain