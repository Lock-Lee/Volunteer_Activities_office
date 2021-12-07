import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import GLOBAL from "../GLOBAL";

import { AuthConsumer, } from '../role-accress/authContext'

const TheHeaderDropdown = ({user}) => {
  console.log("user",user);
  return ( 
    <AuthConsumer>
      {({ logout }) => (
        <CDropdown
          inNav
          className="c-header-nav-items mx-2"
          direction="down"
        >
          <CDropdownToggle className="c-header-nav-link" caret={false}>
          <span style={{paddingLeft:8,paddingRight:8}}>{user.user_name+" "+user.user_lastname} </span>

            <div className="c-avatar">
              <CImg
                src={GLOBAL.BASE_SERVER.URL+user.user_profile_image}
                className="c-avatar-img"
                alt="admin@bootstrapmaster.com"
              />
            </div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem onClick={() => logout()}>
              <CIcon name="cil-lock-locked" className="mfe-2" />Logout</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      )}
    </AuthConsumer>
  )
}

export default TheHeaderDropdown
