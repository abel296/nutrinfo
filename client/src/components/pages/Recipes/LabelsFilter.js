import {Component} from 'react'
import {Row, Col, Container} from 'react-bootstrap'

import './LabelsFilter.css'

class LabelsFilter extends Component {
    constructor() {
        super()
        this.state = {
            labelsSelected: []
        }
        this.allLabelsArr = ['ALCOHOL_FREE', 'CELERY_FREE', 'CRUSTACEAN_FREE', 'DAIRY_FREE', 'EGG_FREE', 'FISH_FREE', 'FODMAP_FREE', 'GLUTEN_FREE', 'KETO_FRIENDLY', 'KIDNEY_FRIENDLY', 'KOSHER', 'LOW_POTASIUM', 'LUPINE_FREE', 'MUSTARD_FREE', 'LOW_FAT_ABS', 'NO_OIL_ADDED', 'LOW_SUGAR', 'PALEO', 'PEANUT_FREE', 'PESCATARIAN', 'PORK_FREE', 'RED_MEAT-FREE', 'SESAME_FREE', 'SHELLFISH_FREE', 'SOY_FREE', 'SUGAR_CONSCIOUS', 'TREE_NUT_FREE', 'VEGAN', 'VEGETARIAN', 'WHEAT_FREE']
    }

    handleClick(e) {

        const labelsSelectedCopy = [...this.state.labelsSelected]
        const label = e.target.value
        
        if(labelsSelectedCopy.includes(label)) {

            const indexOfLabel = labelsSelectedCopy.indexOf(label)
            labelsSelectedCopy.splice(indexOfLabel, 1)

        } else {labelsSelectedCopy.push(label)}

        e.target.className ? e.target.className = '' : e.target.className = 'active'

        this.setState({labelsSelected: labelsSelectedCopy}, () => this.props.filter(this.state.labelsSelected))
    }

    render() {
        return(
            <>
            <Container className='labels-section'>
            <h2>Filters</h2>

            <Row className='labels'>
            {this.allLabelsArr.map((elm, idx) => {
                return (
                    <Col className='label' md={12} sm={4} xs={6} key={idx} >
                    <input type='button' value={elm} onClick={(e)=>this.handleClick(e)} />
                    </Col>
                )
                })}
            </Row>
            </Container>
                
            </>
        )
    }

}

export default LabelsFilter


