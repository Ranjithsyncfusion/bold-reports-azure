CREATE TABLE BOLDTC_TenantStorageDetails (
    Id VARCHAR2(36) NOT NULL,
    TenantInfoId VARCHAR2(36) NOT NULL,
    StorageType NUMBER NOT NULL,
    ConnectionInfo CLOB,
    CreatedDate TIMESTAMP NOT NULL,
    ModifiedDate TIMESTAMP NOT NULL,
    IsActive NUMBER(1) NOT NULL,
    CONSTRAINT PK_BOLDTC_TenantStorageDetails PRIMARY KEY (Id)
); 