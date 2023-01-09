import React from 'react'
import {HashLink as Link} from 'react-router-hash-link';
import Logo from '../../Assets/images/logo/logo_footer.svg'
import { menu } from '../../data/menu'
import LogoMain from '../Logo/LogoMain'
import '../../Assets/style/style.css'
import '../../Assets/style/reponsive.css'
import NavLinkMenu from './NavLinkMenu'
import { useEffect } from 'react'
import $ from 'jquery'
function NavBarMain() {
    useEffect(()=>{
        $(function () {
            $(document).scroll(function () {
              var $nav = $(".navbar-fixed-top");
              $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
            });
          });
    },[])
    return (
        <nav class="navbar navbar-expand-lg fixed-top navbar-fixed-top">
            <div class="container">
                <Link to={'/'} class="navbar-brand">
                    <LogoMain image={Logo} />
                    <p class="logo_slogan">Your key to advertising</p>
                </Link>

                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav ms-auto">
                        {
                            menu?.map((data) => {
                                if(data.id===2){
                                  return(  <li className="nav-item" key={data.id}>
                                  <Link to={data.href} className="nav-link" >{data.name}</Link>
                             </li>)
                                }else{
                                    return (<NavLinkMenu key={data.id} name={data.name} href={data.href} />)
                                }
                                
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBarMain