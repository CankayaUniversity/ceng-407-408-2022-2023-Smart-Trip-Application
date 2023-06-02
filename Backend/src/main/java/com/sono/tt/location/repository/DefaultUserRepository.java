package com.sono.tt.location.repository;

import com.sono.tt.location.DynamoConfiguration;
import com.sono.tt.location.DynamoRepository;
import com.sono.tt.location.IdGenerator;
import com.sono.tt.location.model.User;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.util.CollectionUtils;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Singleton // <1>
public class DefaultUserRepository extends DynamoRepository<User> implements UserRepository {
    private static final Logger LOG = LoggerFactory.getLogger(DefaultUserRepository.class);
    private static final String ATTRIBUTE_ID = "id";
    private static final String ATTRIBUTE_USERNAME = "name";
    private static final String ATTRIBUTE_EMAIL = "email";
    private static final String ATTRIBUTE_PASSWORD = "password";
    private static final String ATTRIBUTE_ICON = "icon";

    private final IdGenerator idGenerator;
    public DefaultUserRepository(DynamoDbClient dynamoDbClient,
                                 DynamoConfiguration dynamoConfiguration,
                                 IdGenerator idGenerator) {
        super(dynamoDbClient, dynamoConfiguration);
        this.idGenerator = idGenerator;
    }

    @Override
    @NonNull
    public String save(@NonNull @NotBlank String username,
                       @NonNull @NotBlank String email, @NonNull @NotBlank String password, @NonNull @NotBlank String icon) {
        String id = idGenerator.generate();
        save(new User(id, username, email, password, icon));
        return id;
    }

    protected void save(@NonNull @NotNull @Valid User user) {
        PutItemResponse itemResponse = dynamoDbClient.putItem(PutItemRequest.builder()
                .tableName(dynamoConfiguration.getTableName())
                .item(item(user))
                .build());
        if (LOG.isDebugEnabled()) {
            LOG.debug(itemResponse.toString());
        }
    }

    @Override
    @NonNull
    public Optional<User> findById(@NonNull @NotBlank String id) {
        return findById(User.class, id)
                .map(this::userOf);
    }

    @Override
    public void delete(@NonNull @NotBlank String id) {
        delete(User.class, id);
    }

    @Override
    @NonNull
    public List<User> findAll() {
        List<User> result = new ArrayList<>();
        String beforeId = null;
        do {
            QueryRequest request = findAllQueryRequest(User.class, beforeId, null);
            QueryResponse response = dynamoDbClient.query(request);
            if (LOG.isTraceEnabled()) {
                LOG.trace(response.toString());
            }
            result.addAll(parseInResponse(response));
            beforeId = lastEvaluatedId(response, User.class).orElse(null);
        } while(beforeId != null); // <2>
        return result;
    }

    private List<User> parseInResponse(QueryResponse response) {
        List<Map<String, AttributeValue>> items = response.items();
        List<User> result = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(items)) {
            for (Map<String, AttributeValue> item : items) {
                result.add(userOf(item));
            }
        }
        return result;
    }

    @NonNull
    private User userOf(@NonNull Map<String, AttributeValue> item) {
        return new User(item.get(ATTRIBUTE_ID).s(),
                item.get(ATTRIBUTE_USERNAME).s(),
                item.get(ATTRIBUTE_EMAIL).s(),
                item.get(ATTRIBUTE_PASSWORD).s(),
                item.get(ATTRIBUTE_ICON).s());
    }

    @Override
    @NonNull
    protected Map<String, AttributeValue> item(@NonNull User user) {
        Map<String, AttributeValue> result = super.item(user);
        result.put(ATTRIBUTE_ID, AttributeValue.builder().s(user.getId()).build());
        result.put(ATTRIBUTE_USERNAME, AttributeValue.builder().s(user.getUsername()).build());
        result.put(ATTRIBUTE_EMAIL, AttributeValue.builder().s(user.getEmail()).build());
        result.put(ATTRIBUTE_PASSWORD, AttributeValue.builder().s(user.getPassword()).build());
        result.put(ATTRIBUTE_GSI_2_PK, AttributeValue.builder().s("User").build());
        result.put(ATTRIBUTE_GSI_2_SK, AttributeValue.builder().s(user.getEmail()).build());
        result.put(ATTRIBUTE_ICON, AttributeValue.builder().s(user.getIcon()).build());
        return result;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        QueryRequest request = findByGsi2("User", email);
        QueryResponse response = dynamoDbClient.query(request);
        if (LOG.isTraceEnabled()) {
            LOG.trace(response.toString());
        }

        return parseInResponse(response).stream().findFirst();
    }

}
