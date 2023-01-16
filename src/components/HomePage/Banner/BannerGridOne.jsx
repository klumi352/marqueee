import React from 'react';
import { useEffect, useState, useMemo, useRef } from "react";
import { Link } from 'react-router-dom';
import "../.././../Assets/style/banner-grid.css";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import mp3_file from '../../../Assets/audio/dubstep.mp3';
import { isDesktop, isSafari } from 'react-device-detect';
import { StatefulToolTip } from "react-portal-tooltip"
import loadingGif from '../../../Assets/images/loading.gif'
// import { encode } from "base-64";
import { VStack } from '@chakra-ui/react';
import vangogh from '../../../Assets/images/vangogh.jpeg'
function BannerGridOne() {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [showAudioPlayer, setShowAudioPlayer] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [vanGogh, setVanGogh] = useStateWithCallbackLazy([]);
  const [displayCanvas, setDisplayCanvas] = useState("block");
  const player = useRef(null);
  const gridImages = useRef(null);
  const outputRef = useRef(null);
  const canvas = useRef(null);
  var rafId;
  var ctx1 = null;
  var analyser = null;
  var audioSrc = null;
  var bufferLength;
  var dataArray;
  var barHeight = 0;

  let ctx, x_end, y_end, bar_height;
  const width = 320;
  const height = 320;
  const bars = 128;
  const barWidth = 4;
  const center_x = width / 2;
  const center_y = height / 2;
  var percent = 0;
  var intensity = 0;
  var radius = 0;

  var currentTimeJs = 0;
  var checkTime = 0;
  var checkTimeMod = 0;
  var times = [
    0, 13, 25.5, 32, 38.5, 44.8, 51.2, 57.5, 64, 70.3, 76.8, 83.2, 89.5, 96, 102.2, 108.8, 115, 121.5, 128, 134.5, 140.8, 147.2, 153.5
  ];
  var centerX = 320;
  var centerY = 50;
  const NUM_COLS = 32;
  const NUM_ROWS = 32;
  const QR_COLOR_CODE = '#F9FFA2';

  const seeked = (e) => {
    e.preventDefault();
    //setCurrentTime(player.current.audio.current.currentTime);
    currentTimeJs = player.current.audio.current.currentTime;

    for (var i = 0; i < times.length; i++) {
      if (times[i] > Math.ceil(currentTimeJs)) {
        checkTime = i;
        break;
      }
    }
  }

  const playerOn = (e) => {
    e.preventDefault();
    try {
      if (ctx1 == null && analyser == null && audioSrc == null) {
        ctx1 = new AudioContext();
        analyser = ctx1.createAnalyser();
        audioSrc = ctx1.createMediaElementSource(player.current.audio.current);
        // we have to connect the MediaElementSource with the analyser
        audioSrc.connect(analyser);
        analyser.connect(ctx1.destination);
        analyser.fftSize = 512;

        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      }

      const drawCircle = (ctx, centerX, centerY, radius) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, (2*Math.PI) );
        ctx.lineWidth = 0;
        ctx.strokeStyle = "rgb(253, 255, 189, 0.5)";
        ctx.stroke();
        ctx.closePath();
      }

      const animationLooper = (canvas) => {
        try {
          canvas.width = width;
          canvas.height = height;

          ctx = canvas.getContext("2d");

          if (currentTimeJs > times[checkTime]) {
            checkTimeMod = checkTime % 11;
            if (checkTimeMod == 0) {
              centerX = 320;
              centerY = 50;
              intensity = 1.4;
              radius = 30;
            }
            else if (checkTimeMod == 1) {
              centerX = 100;
              centerY = 167;
              intensity = 0.9;
              radius = 12;
            }
            else if (checkTimeMod == 2) {
              centerX = 50;
              centerY = 55;
              intensity = 0.6;
              radius = 10;
            }
            else if (checkTimeMod == 3) {
              centerX = 202;
              centerY = 24;
              intensity = 0.75;
              radius = 10;
            }
            else if (checkTimeMod == 4) {
              centerX = 3;
              centerY = 15;
              intensity = 0.6;
              radius = 11;
            }
            else if (checkTimeMod == 5) {
              centerX = 10;
              centerY = 150;
              intensity = 0.6;
              radius = 10;
            }
            else if (checkTimeMod == 6) {
              centerX = 94;
              centerY = 10;
              intensity = 0.6;
              radius = 9;
            }
            else if (checkTimeMod == 7) {
              centerX = 240;
              centerY = 70;
              intensity = 0.75;
              radius = 11;
            }
            else if (checkTimeMod == 8) {
              centerX = 88;
              centerY = 103;
              intensity = 0.4;
              radius = 11;
            }
            else if (checkTimeMod == 9) {
              centerX = 121;
              centerY = 17;
              intensity = 0.4;
              radius = 10;
            }
            else if (checkTimeMod == 10) {
              centerX = 48;
              centerY = 8;
              intensity = 0.3;
              radius = 7;
            }

            checkTime++;
          }
          drawCircle(ctx, centerX, centerY, radius);

          var x = 0;
          var numBars = dataArray.length / 2;
          for (var i = 0; i < numBars; i++) {
              //divide a circle into equal part
              //const rads = Math.PI * 2 / bars;

              // Math is magical
              //barHeight = dataArray[i] * 2;
              percent = Math.ceil(dataArray[i] / 256 * 100);
              //const barHeight = dataArray[i];

              /*
              const x = center_x + Math.cos(rads * i) * (radius);
              const y = center_y + Math.sin(rads * i) * (radius);
              x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
              y_end = center_y + Math.sin(rads * i) * (radius + bar_height); */

              //draw a bar
              //drawBar(x, y, x_end, y_end, dataArray[i], ctx, canvas);
              /*
              ctx.shadowColor = '#00ff00';
              ctx.shadowBlur = 40;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
              ctx.beginPath();
              ctx.fillStyle = `rgba(255, 255, 0, 0.55)`;
              ctx.fillRect(x, height - barHeight - 50, barWidth, 10);
              ctx.arc(125,125,100,Math.PI/6,12*Math.PI/6);
              x += barWidth + 32;
              ctx.stroke();*/

              barHeight = (dataArray[i] * intensity);

              let rads = (Math.PI * 2) / numBars;
              let x = centerX + Math.cos(rads * i) * (radius);
              let y = centerY + Math.sin(rads * i) * (radius);
              let x_end = centerX + Math.cos(rads * i) * (radius + barHeight);
              let y_end = centerY + Math.sin(rads * i) * (radius + barHeight);

              drawBar(ctx, x, y, x_end, y_end, barWidth);
          }
          //drawTimeData(dataArray, 1);
          drawTimeData(dataArray, 2);
        } catch (error) {

        }
      }

      const drawBar = (canvasContext, x1, y1, x2, y2, width) => {
          const gradient = canvasContext.createLinearGradient(x1, y1, x2, y2); // set a gradient for the bar to be drawn with

          // color stops for the gradient
          gradient.addColorStop(0, "rgb(253, 255, 189, 0.5)");
          gradient.addColorStop(0.8, "rgb(254, 255, 219, 0.5)");
          gradient.addColorStop(1, "white");

          canvasContext.lineWidth = width; // set line width equal to passed in width
          canvasContext.strokeStyle = gradient; // set stroke style to gradient defined above
          // draw the line!
          canvasContext.beginPath();
          canvasContext.moveTo(x1,y1);
          canvasContext.lineTo(x2,y2);
          canvasContext.stroke();
          canvasContext.closePath();
      }

      const drawTimeData = (timeData, num) => {
        // inject the time data into our timeData array
        analyser.getByteTimeDomainData(timeData);
        // now that we have the data, lets turn it into something visual
        // 1. Clear the canvas TODO
        // 2. setup some canvas drawing
        var deg = 15;
        ctx.save();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#E1D894";
        ctx.beginPath();
        const sliceWidth = width / bufferLength;
        let x = 0;
        timeData.forEach((data, i) => {
          const v = data / 512 * num;
          const y = (v * height) / 2 * num;
          // draw our lines
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          //ctx.rotate(i * Math.PI / 180); // rotate canvas
          x += sliceWidth;
        });
        ctx.stroke();
        ctx.restore(); // restore canvas
        // call itself as soon as possible
        requestAnimationFrame(() => drawTimeData(timeData));
      }

      const renderFrame = () => {
        try {
          analyser.getByteFrequencyData(dataArray);

          //setCurrentTime(player.current.audio.current.currentTime);
          currentTimeJs = player.current.audio.current.currentTime;

          animationLooper(canvas.current);
          rafId = requestAnimationFrame(renderFrame);
        } catch (error) {

        }
      }
      rafId = requestAnimationFrame(renderFrame);
    } catch (error) {
      ctx1.close();
    }
  }

  const playerOff = (e) => {
    e.preventDefault();
    cancelAnimationFrame(rafId);
  }

  const getBannerGrid = async (vanGoghArr) => {
    setLoader(true);
    setShowAudioPlayer(true);
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_owner_list.php?limit=1001&offset=0&t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resJson = await res.json();
      if (res.status === 200) {
        const resJsonObj = (resJson.owners) ? resJson.owners : [];
        const nftObj = (resJson.nfts) ? resJson.nfts : [];
        setLoader(false);
        generateGrid(resJsonObj, nftObj, vanGoghArr);
      } else {
        setError("Some error occured");
      }
    } catch (error) {
      setError(error);
      setLoader(false);
    }
  }

  const getQRCode = async () => {
    setLoader(true);
    setShowAudioPlayer(false);
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/qr_code.php?t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resJson = await res.json();

      let resVanGogh = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_van_gogh.php?t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resVanGoghJson = await resVanGogh.json();

      if (res.status === 200 && resVanGogh.status === 200) {
        generateQRCode(resJson, resVanGoghJson);
        setLoader(false);
      } else {
        setError("Some error occured");
      }
    } catch (error) {
      setError(error);
      setLoader(false);
    }
  }

  const hideCanvas = (e) => {
    setDisplayCanvas("none");
  }

  const showCanvas = (e) => {
    setDisplayCanvas("block");
  }

  const visitSite = async (e, ad_id, url) => {
    e.preventDefault();
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/count_visit.php", {
        method: "POST",
        body: JSON.stringify({
          ad_id: ad_id
        }),
      });

      if (res.status === 200) {
        window.open(url);
      } else {
        setError("Some error occured");
      }
    } catch (error) {
      setError(error);
    }

    return false;
  }

  const generateQRCode = (qrObj, vanGoghArr) => {
    var box = 0; // counter for which box.
    setRows([]);
    for (var i = 0; i < NUM_ROWS; i++) {
      var cols = [];
      for (var j = 0; j < NUM_COLS; j++) {
        var bg_color = (qrObj[i][j] == 1) ? QR_COLOR_CODE : '#' + vanGoghArr[box];
        cols.push(<div key={j*(i+1)} className="small-div" style={{backgroundColor: bg_color, boxShadow: 'none'}}></div>);
        box++;
      }
      setRows(content => [...content, cols]);
    }
  }

  const generateGrid = (resJsonObj, nftObj, vanGoghArr) => {
    var rows = [];
    var gridImg = "";
    var grid = "";
    var box = 0; // counter for which box.
    var n = 0; // start index for json objects.
    setRows([]);
    for (var i = 0; i < NUM_ROWS; i++) {
      var cols = [];
      for (var j = 0; j < NUM_COLS; j++) {
        gridImg = "";
        if (resJsonObj[n] && resJsonObj[n].banner_grid_id == (box+1)) {
          let id = resJsonObj[n].id;
          let url = resJsonObj[n].url;
          let nft_name = resJsonObj[n].nft_name;
          let title = resJsonObj[n].title;
          let description = resJsonObj[n].description;
          let token_id = resJsonObj[n].token_id;
          let visits = resJsonObj[n].visits;
          let banner_grid_id = resJsonObj[n].banner_grid_id;
          let color_hex_code = resJsonObj[n].color_hex_code;

          var imgStyle = {};
          if (vanGoghArr.length) {
            imgStyle = {mixBlendMode: 'overlay'};
          }

          grid = <div>
                    <Link to="#" onClick={(e) => visitSite(e, id, url)}><img src={process.env.REACT_APP_MARQUEE_URL + "/api/banner_image.php?token_id=" + token_id + "&type=grid"} style={imgStyle} /></Link>
                  </div>

          gridImg = <div>
                      <StatefulToolTip parent={ grid } position="left" arrow="bottom" tooltipTimeout="2000">
                        <div className="tooltip-row">
                          <div className="tooltip-column">
                            <a href="#" onClick={(e) => visitSite(e, id, url)}><img src={process.env.REACT_APP_MARQUEE_URL + "/api/banner_image.php?token_id=" + token_id + "&type=square"} /></a>
                          </div>
                          <div className="tooltip-column">
                            <p><b>{title}</b></p>
                            <p>{description}</p>
                            <p><div className="colorBox" style={{background: color_hex_code}}></div>&nbsp;{color_hex_code}</p>
                            <p>Unique Visits: <b>{visits}</b></p>
                            <p><a target="_blank" href={url}>{url}</a></p>
                            <br />
                            <p>NFT Edition No. {banner_grid_id}/1024</p>
                          </div>
                        </div>
                      </StatefulToolTip>
                    </div>

          n++;
        }
        else {
          var id = 1+box;
          let url = "https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/" + nftObj[id]['token_id'];
          grid = <div style={{width:'10px', height:'10px', cursor:'pointer'}} onClick={(e) => window.open(url)}></div>

          gridImg = <div>
                      <StatefulToolTip parent={ grid } position="left" arrow="bottom" tooltipTimeout="2000">
                        <div className="tooltip-row">
                          <div className="tooltip-column">
                            <a href="#" onClick={(e) => window.open(url)}><img width="120" height="120" src={process.env.REACT_APP_MARQUEE_URL + "/nft_images/" + id + ".png"} /></a>
                          </div>
                          <div className="tooltip-column">
                            <p><b>MM NFT Ad Slot Empty</b></p>
                            <p><div className="colorBox" style={{background: "#" + nftObj[id]['color_code']}}></div>&nbsp;#{nftObj[id]['color_code']}</p>
                            <p><a target="_blank" href={url}>Buy MM NFT</a></p>
                            <br />
                            <p>NFT Edition No. {id}/1024</p>
                          </div>
                        </div>
                      </StatefulToolTip>
                    </div>

        }

        if (vanGoghArr.length)
          cols.push(<div key={j*(i+1)} className="small-div" style={{backgroundColor: '#' + vanGoghArr.shift(),boxShadow: 'none'}}>{gridImg}</div>);
        else
          cols.push(<div key={j*(i+1)} className="small-div">{gridImg}</div>);

        box++;
      }
      setRows(content => [...content, cols]);
    }
  }

  const showVanGogh = async () => {
    setLoader(true);
    setShowAudioPlayer(true);
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_van_gogh.php?t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setLoader(false);
        setVanGogh(resJson, () => {
          getBannerGrid(resJson);
        });
      } else {
        setError("Some error occured");
      }
    } catch (error) {
      setError(error);
      setLoader(false);
    }
  }

  const showVanGoghOriginal = () => {
    setShowAudioPlayer(true);
    let row = [];
    row[0] = <img src={vangogh} />;
    setRows(row);
  }

  useEffect(() => {
    showVanGogh();
  }, []);

  return (
    <div className="body_wrapper">
      <VStack justifyContent="center" alignItems="center">
        {loader ? (
          <>
            <div style={{width: '320px', height: '320px'}}>
              <img src={loadingGif} alt="Loading" /> <br /> Loading...
            </div>
          </>
        ) : (
          <>
            <div className="banner-grid" style={{position: 'relative'}} ref={gridImages} onMouseLeave={(e) => showCanvas(e)}>
              <div style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}>
                {rows.map((item,key)=>
                 <>
                    <div key={key} className="main-div">
                     {item}
                    </div>
                  </>
                 )}
              </div>
              <div onMouseEnter={(e) => hideCanvas(e)} style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}><canvas width="320" height="320" ref={canvas} style={{display: displayCanvas}} /></div>
            </div>
            <div className="banner-grid-links">
              <p><Link to="#" onClick={(e) => getBannerGrid([])}>Show Normal Grid</Link></p>
              <p><Link to="#" onClick={showVanGogh}>Show Van Gogh's <em>Starry Night</em> Grid</Link></p>
              <p><Link to="#" onClick={showVanGoghOriginal}>Show Original Van Gogh's <em>Starry Night</em> Image</Link></p>
              <p><Link to="#" onClick={(e) => getQRCode([])}>Show Grid With QR Code</Link></p>
              {isDesktop && !isSafari && showAudioPlayer && (
                <div>
                  <br />
                  <AudioPlayer
                    src={mp3_file}
                    onPlay={e => playerOn(e)}
                    onPause={e => playerOff(e)}
                    onSeeked={e => seeked(e)}
                    ref={player}
                  />
                  <p className='nft_text_i'>Press playfor music with an artistic touch to Van Gogh's Starry Night</p>
                </div>
              )}
            </div>
          </>
        )}
      </VStack>
    </div>
  )
}

export default BannerGridOne