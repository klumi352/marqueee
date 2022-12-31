import React from 'react'
import Image from '../../Tags/Image'
import BannerLeft from './BannerLeft'

import Banner from '../../../Assets/images/images/banner_image.jpg'
import Bannerleft from '../../../Assets/images/icons/banner_left_bg.png'
import BannerGridOne from './BannerGridOne'
import BannerGridTwo from './BannerGridTwo'
function BannerMain() {
	return (
		<>
			<section className="hero_section hero_section_home">
				<div className="container">
					<div className="row justify-content-between align-items-center">
						<div className="col-md-12">
						</div>
						<div className="col-md-12 col-lg-6">
							<BannerLeft />
						</div>


						<div className="col-md-12 col-lg-5">
							<div className="nft_player">
								<div style={{ background: `url(${Bannerleft})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'top ' }}>

									<ul className="nav nav-pills index_tab_menu nft_dash_tab" id="myTab2"
										role="tablist">
										<li className="nav-item" role="presentation">
											<button className="nav-link active" id="home-tab1" data-bs-toggle="tab"
												data-bs-target="#home1" type="button" role="tab" aria-controls="home"
												aria-selected="true">32x32 Grid </button>
										</li>
										<li className="nav-item" role="presentation">
											<button className="nav-link" id="profile-tab1" data-bs-toggle="tab" data-bs-target="#profile1"
												type="button" role="tab" aria-controls="profile1" aria-selected="false">Banners</button>
										</li>
									</ul>

									<div className="tab-content banner_tab_content" id="myTabContent">
										<div className="tab-pane fade show active" id="home1" role="tabpanel" aria-labelledby="home-tab">
											<BannerGridOne />
										</div>
										<div className="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab">
											<BannerGridTwo />
										</div>

									</div>


								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default BannerMain