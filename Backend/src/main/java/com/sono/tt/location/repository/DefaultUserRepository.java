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
    private static final String ATTRIBUTE_MAIL = "mail";
    private static final String ATTRIBUTE_PASSWORD = "password";

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
                @NonNull @NotBlank String mail, @NonNull @NotBlank String password) {
        String id = idGenerator.generate();
        save(new User(id, username, mail, password));
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
                item.get(ATTRIBUTE_MAIL).s(),
                item.get(ATTRIBUTE_PASSWORD).s());
    }

    @Override
    @NonNull
    protected Map<String, AttributeValue> item(@NonNull User user) {
        Map<String, AttributeValue> result = super.item(user);
        result.put(ATTRIBUTE_ID, AttributeValue.builder().s(user.getId()).build());
        result.put(ATTRIBUTE_USERNAME, AttributeValue.builder().s(user.getUsername()).build());
        result.put(ATTRIBUTE_MAIL, AttributeValue.builder().s(user.getMail()).build());
        result.put(ATTRIBUTE_PASSWORD, AttributeValue.builder().s(user.getPassword()).build());
        return result;
    }
}
