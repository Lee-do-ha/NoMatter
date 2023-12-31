package com.example.nomatter.domain.userdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UserLoginRequest {

    private String userId;
    private String userPassword;
    private String socialType;

}
