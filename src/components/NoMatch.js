import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

function NoMatch (props) {
    return (
        <Grid item xs={12} md={6} style={{ margin: "auto", marginTop: 30 }}>
            <Card style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                        <CardContent style={{textAlign: "center"}}>
                            <Typography variant="headline">
                                404 Page Not Found
                            </Typography>
                            <Typography variant="subheading">                 
                                Maybe the page you are looking for has been removed, or you typed in the wrong URL
                            </Typography>
                            <Button variant="contained" color="secondary"component={Link} to="/" style={{marginTop:15}}>
                                Go To HomePage
                            </Button>
                        </CardContent>
                    
                </div>
            </Card>
        </Grid>
    )
}

export default NoMatch