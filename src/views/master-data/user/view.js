import React from "react";
import { Card, CardBody, CardHeader, Col, Label } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading, Table, Select } from "../../../component/revel-strap";

import UserModel from "../../../models/UserModel";

const user_model = new UserModel();

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: "20",
      showloading: true,
      users: [],
      PERMISSION: [],
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
    this.setState(
      {
        showloading: true,
      },
      async () => {
        const users = await user_model.getUserBy({
          params: params,
          action: "getUserBy",
        });
        console.log("user", users);

        this.setState({
          showloading: false,
          users: users,
          pageSize: users.pageSize,
        });
      }
    );
  }

  _onDelete(code) {
    Swal.fire({
      title: "Are you sure ?",
      text: "Confirm to delete this item",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.setState(
          {
            showloading: true,
          },
          async () => {
            user_model.deleteUserByCode({ user_code: code }).then((res) => {
              if (res.require) {
                Swal.fire("Success Deleted!", "", "success");
                this._fetchData();
              } else {
                this.setState({ showloading: false });
                Swal.fire("Sorry, Someting worng !", "", "error");
              }
            });
          }
        );
      }
    });
  }

  render() {
    const { permission_add, permission_edit, permission_delete } =
      this.state.PERMISSION;

    return (
      <div className="animated fadeIn">
        <Loading showloading={this.state.showloading} />
        <Card>
          <CardHeader>
            <h3>พนักงาน </h3>
            <Col md="12">
              {permission_add ? (
                <Link
                  to={`/user/insert`}
                  className="btn btn-success float-right"
                >
                  <i className="fa fa-plus" aria-hidden="true"></i> เพิ่มผู้ใช้
                </Link>
              ) : null}
              <Link to={`/user-Position`}>
                <button className="btn btn-primary float-right">
                  <i className="fa fa-cog" aria-hidden="true"></i> จัดการตำแหน่ง
                </button>
              </Link>
              <Col md="3"></Col>
            </Col>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.users.data}
              dataTotal={this.state.users.total}
              pageSize={this.state.pageSize}
              rowKey="user_code"
              columns={[
                {
                  title: "รหัสพนักงาน",
                  dataIndex: "user_code",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "ชื่อ",
                  dataIndex: "user_full_name",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "ตำแหน่ง ",
                  dataIndex: "position_name",
                  filterAble: true,
                  ellipsis: true,
                },
                // {
                //   title: "สิทธิ์การใช้งาน",
                //   dataIndex: "license_name",
                //   filterAble: true,
                //   ellipsis: true,
                // },
                {
                  title: "โทรศัพท์ ",
                  dataIndex: "user_tel",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "อีเมล์ ",
                  dataIndex: "user_email",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "สถานะ ",
                  dataIndex: "user_status",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    if (permission_edit) {
                      row_accessible.push(
                        <Link
                          key="update"
                          to={`/user/update/${cell.user_code}`}
                          title="แก้ไขรายการ"
                        >
                          <button
                            type="button"
                            className="icon-button color-warning"
                          >
                            <i className="fas fa-edit" aria-hidden="true"></i>
                          </button>
                        </Link>
                      );
                    }
                    if (permission_delete) {
                      row_accessible.push(
                        <button
                          key="delete"
                          type="button"
                          className="icon-button color-danger"
                          onClick={() => this._onDelete(cell.user_code)}
                          title="ลบรายการ"
                        >
                          <i
                            className="far fa-trash-alt"
                            aria-hidden="true"
                          ></i>
                        </button>
                      );
                    }

                    return row_accessible;
                  },
                  width: 80,
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default View;
