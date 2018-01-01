const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {   
        _id: new ObjectID(),
        text: 'First test todo' 
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333 
    }
];


beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', ()=>{
    it('should create a new todo', (done) => {
        let text = 'Test todo-text.';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) return done(err);
            
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

});

describe('GET /todos', () => {
    it ('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) =>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });

    describe('GET /todos/:id', () => {
        it('should return todo doc', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect(res => {
                    expect (res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
        });

        it('should return a 404 if id not found', (done) =>{
            const hexId = new ObjectID().toHexString();

            request(app)
                .get(`/todos/${hexId}`)
                .expect(404)
                .end(done);
        });

        it('should return a 404 if id is invalid',(done) => {
            request(app)
                .get(`/todos/5a44c871b`)
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /todos/:d', () => {
    it('should return deleted todo doc', (done) => {
        const hexId = todos[0]._id.toHexString();
        const firstTodoText = todos[0].text;

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(res => {
                expect (res.body.deleted.text).toBe(firstTodoText);
            })
            .end((err, res) => {
                if (err) return done(err);
                Todo.findById(hexId).then(todo => {
                    expect(todo).toNotExist();
                    done();
                }).catch (e => done(e));
            });
    });

    it('should return a 404 if id not found', (done) =>{
        const hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is invalid',(done) => {
        request(app)
            .delete(`/todos/5a44c871b`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it ('should update the todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        const firstTodoText = todos[0].text;
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: "updated text - added completed", completed: true})
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toNotBe(firstTodoText);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
                done();
            }).catch(e => done(e));
    });

    it('should clear completed At when todo is not compelted', (done) => {
        const hexId = todos[1]._id.toHexString();
        const firstTodoText = todos[1].text;
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: "updated text - removed completed", completed: false})
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toNotBe(firstTodoText);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
                done();
            }).catch(e => done(e));
    })
});