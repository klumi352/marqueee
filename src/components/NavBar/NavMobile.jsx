import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../Assets/images/logo/logo_footer.svg'
import { menu } from '../../data/menu'
import LogoMain from '../Logo/LogoMain'
import { HashLink } from 'react-router-hash-link';
function NavMobile() {
    return (
        <>
            <div className="offcanvas offcanvas-end bsr_SideBar" tabindex="-1" id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <LogoMain addclassName={'footer_logo'} image={Logo} />
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">

                    <div className="accordion" id="accordionExample">

                        {
                            menu.map((data) => {
                                if (data.id === 2) {
                                    return (<div className="accordion-item" key={data.id}>
                                        <h2 className="accordion-header" id="headingOne" data-bs-dismiss="offcanvas" aria-label="Close">
                                            <HashLink to={data.href} className="accordion-button collapsed link">{data.name}</HashLink>
                                        </h2>
                                    </div>
                                    )
                                } else {
                                    return (
                                        <div className="accordion-item" key={data.id}>
                                            <h2 className="accordion-header" id="headingOne" data-bs-dismiss="offcanvas" aria-label="Close">
                                                <HashLink to={`${data.href}#`} className="accordion-button collapsed link"
                                                //  data-bs-dismiss="offcanvas" aria-label="Close"
                                                >
                                                    {data.name}
                                                </HashLink>

                                            </h2>
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavMobile