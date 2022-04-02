import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from "react"


function SimpleAccordion({ title, children, disabled = false, openInitialy = false }) {
    const [expanded, setExpanded] = useState(openInitialy)

    const handleChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false)
    }


    return (
        <div>
            <Accordion
                expanded={expanded}
                onChange={handleChange}
                disabled={disabled}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'> {title} </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SimpleAccordion
