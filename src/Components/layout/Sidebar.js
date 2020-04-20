import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from  'materialize-css/dist/js/materialize.min.js';
import BurgerMenu from './BurgerMenu';

class Sidebar extends Component {
    componentDidMount() {
        let sidenav = document.querySelector('#mobile-menu');
        M.Sidenav.init(sidenav, {});
    }

    render() {
        return (
            <BurgerMenu />
        )
    }
}

export default Sidebar;