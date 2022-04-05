import '../App.css';
import {React} from 'react';

/**
 * Bottom panel component
 *
 * @returns bottom panel component
 */
export const FooterComponent = () => {

    return (
        <div className="footer">
            <div className="footer-top">
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom_content article-width">
                    <div className="footer-bottom_link">
                        © 2022, Reactive Tales
                    </div>
                </div>
            </div>
        </div>
    )
}
