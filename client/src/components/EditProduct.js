import React, { Component } from "react";
import axios from "axios";
import { Card, Page, FormLayout, TextField, Button } from "@shopify/polaris";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      title: "",
      type: "",
      price: "",
      compareAt: "",
      description: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    this.setState({ productId: lastURLSegment });
    const ReqUrl = "/api/product/" + lastURLSegment;
    axios.get(ReqUrl).then(res => {
      const product = res.data;
      this.setState({
        title: product.title,
        type: product.product_type,
        price: product.variants[0].price,
        compareAt: product.variants[0].compare_at_price,
        description: product.body_html
      });
    });
  }

  handleInputChange(field) {
    return value => this.setState({ [field]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const PutUrl = "/api/update/";

    const product = {
      id: this.state.productId,
      title: this.state.title,
      type: this.state.type,
      price: this.state.price,
      compareAt: this.state.compareAt,
      description: this.state.description
    };

    axios.post(PutUrl, product);

    alert("Product Updated");
    window.location = "/";
  }

  render() {
    return (
      <Page
        title="Edit Product"
        breadcrumbs={[
          {
            content: "View All",
            url: "/"
          }
        ]}
      >
        <Card sectioned>
          <form onSubmit={this.onSubmit}>
            <FormLayout.Group>
              <TextField
                type="text"
                label="Name"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange("title")}
                placeholder="Product Name"
              />
              <TextField
                type="text"
                label="Type"
                name="Type"
                value={this.state.type}
                onChange={this.handleInputChange("type")}
                placeholder="Product Type"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="currency"
                label="Price"
                prefix="$"
                value={this.state.price}
                onChange={this.handleInputChange("price")}
              />
              <TextField
                type="currency"
                label="Compare At Price"
                prefix="$"
                value={this.state.compareAt}
                onChange={this.handleInputChange("compareAt")}
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField
                type="textarea"
                label="Description"
                multiline
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange("description")}
                placeholder="Product Description"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <Button submit>Update</Button>
            </FormLayout.Group>
          </form>
        </Card>
      </Page>
    );
  }
}

export default Register;
