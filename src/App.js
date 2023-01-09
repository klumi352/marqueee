import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home";
import Footer from './components/Footer/Footer';
import NavBarMain from './components/NavBar/NavBarMain';
import NavMobile from './components/NavBar/NavMobile';
import OwnerDashBoard from './pages/OwnerDashBoard';
import OwnerList from './pages/OwnerList';
import BlogList from './pages/BlogList';
import SingleBlog from './pages/SingleBlog';
import BuyNftForum from './pages/BuyNftForum';
import BuyMMNFT from './pages/BuyMMNFT';
import Contactus from './pages/Contactus';
import About from './pages/About';
import Faq from './pages/Faq';

function App() {
  return (
    <BrowserRouter>
      <NavBarMain />
      <NavMobile />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/owner-dashboard" ><OwnerDashBoard /></Route>
        <Route path="/Dashboard/:tokenId" ><OwnerDashBoard /></Route>
        <Route path="/owner-list" ><OwnerList /></Route>
        <Route path="/blog-list" ><BlogList /></Route>
        <Route path="/blog/:slug" ><SingleBlog /></Route>
        <Route path="/Forum" ><BuyNftForum /></Route>
        <Route path="/Forum/Edit" ><BuyNftForum /></Route>
        <Route path="/purchase" ><BuyMMNFT /></Route>
        <Route path="/contact-us" ><Contactus /></Route>
        <Route path="/about" ><About /></Route>
        <Route path="/faq" ><Faq /></Route>
        <Route path="*"><Home /></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App