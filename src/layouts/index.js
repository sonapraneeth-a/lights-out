import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import "../styles/main.scss"

const version = {
    fontSize: "1rem",
    paddingLeft: "1rem"
}


const TemplateWrapper = ({ data, children }) => (
    <div>
        <Helmet
        title={`${data.site.siteMetadata.title}`}
        meta={[
            { name: "description", content: `${data.site.siteMetadata.description}` },
            { name: "keywords", content: `${data.site.siteMetadata.keywords}` },
            { name: "referrer", content: "origin" },
            { charset: "utf-8" },
            { httpEquiv: "Cache-control", content: "public, max-age=0, must-revalidate" },
        ]}
        />
        <div
        style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0,
        }}
        >
            <h3 className="game-title">
                <span>{data.site.siteMetadata.title}</span>
                <span style={version}>{data.site.siteMetadata.version}</span>
            </h3>
            {children()}
        </div>
    </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper;

export const postQuery = graphql`
  query SiteMetaData {
    site{
        siteMetadata{
          title
          description
          keywords
          version
        }
    }
  }
`
