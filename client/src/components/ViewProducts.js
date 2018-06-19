import React, { Component } from "react";
import { ResourceList, TextStyle, Card, Layout, Page } from "@shopify/polaris";

class ResourceListExample extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch("/api/products")
      .then(products => products.json())
      .then(products => {
        this.setState({ products });
      });
  }

  render() {
    return (
      <Page
        title="Welcome"
        primaryAction={{
          content: "Add a Product",
          url: "/add"
        }}
      >
        <Layout>
          <Layout.AnnotatedSection title="All Products">
            <Card>
              <ResourceList
                resourceName={{ singular: "customer", plural: "customers" }}
                items={this.state.products}
                renderItem={item => {
                  const { id, title, price } = item;
                  const url = "/edit/" + item.id;
                  const handle =
                    "https://lyons-teststore.myshopify.com/products/" +
                    item.handle;

                  const shortcutActions = handle
                    ? [{ content: "View Product In Store", url: handle }]
                    : null;

                  return (
                    <ResourceList.Item
                      id={id}
                      accessibilityLabel={`View details for ${title}`}
                      shortcutActions={shortcutActions}
                      persistActions
                      url={url}
                    >
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                      <div>{price}</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }
}

export default ResourceListExample;
